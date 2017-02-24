package robot;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.*;
import java.nio.ByteBuffer;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.stream.IntStream;

/**
 * Created by railchamidullin on 19/12/2016.
 */
public class Robot {

    public static void main(String[] args) {
        if (args.length == 1) {
            try {
                Connection con = new Connection(args[0]);
                con.establishConnection();
            } catch (IOException e) {
                System.out.println(e.toString());
            }

        } else if (args.length == 2) {
            System.out.println("Firmware upload not implemented yet.");
        } else {
            System.out.println("Usage:\nRobot <hostname> for photo download.\nRobot <hostname> <file> for firmware upload.");
        }
    }
}

class Connection {
    // syn = 4
    // fin = 2
    // rst = 1

    private final int PORT = 4000; // port where packets will be send to and recved from.

    private final InetAddress remote_address;
    private final DatagramSocket socket;
    private int connection_id = 0;
    //private Map<Integer, Packet> receivedPackets = new HashMap<>();
    private List<Packet> receivedPackets = new LinkedList<>();
    private int next_needed = 0, lastPack_length = 0;

    // for debug
    private int num_recvs = 0;
    private int num_sends = 0;

    public Connection(String address) throws IOException {
        this.remote_address = InetAddress.getByName(address);
        this.socket = new DatagramSocket(PORT);
        this.socket.setSoTimeout(100);
        System.out.println("Connected to " + remote_address + ":" + PORT);
    }

    public void establishConnection() throws SocketException {
        Packet first = new Packet(0, 0, 0, (byte) 4, new byte[] {1});

        for(int i = 0; i < 20; ++i) {
            send(first);
            Packet response = recv();
            if(response != null && response.getFlags() == (byte) 4 && connection_id == 0) {
                this.connection_id = response.getId();
                this.socket.setSoTimeout(0);
                System.out.print("   RECV: ");
                printPacket(response);
                communication();
                return;
            }
        }

    }

    private void communication() {
        System.out.print("\n\n");
        while (true) {
            Packet packet = recv();

            if(packet != null && packet.getId() == this.connection_id) { // validate packet
                System.out.print("   RECV: ");
                printPacket(packet);

                if(packet.getFlags() == (byte) 1) { // fin
                    System.out.println("End packet received.");
                    // end packet
                    send(new Packet(connection_id, 0, getMissingPacketNumber(packet), (byte) 2, new byte[0]));


                    System.out.println("Number of packets recieved: " + receivedPackets.size());
                    System.out.println("Number recvs: " + num_recvs + ", number sends: " + num_sends);

                    savePhoto();
                    System.out.println("Photo saved.");
                    break;
                }

                // save packet
                //receivedPackets.put(packet.getSeq_number(), packet);
                //receivedPackets.add(packet);
                savePacket(packet);


                // send confirmation
                send(new Packet(connection_id, 0, getMissingPacketNumber(packet), (byte) 0, new byte[0]));
            }
        }
    }

    // in case of overflow
    private int getIndex(int num) {
        int index, mod = num % 255;

        if(mod == 0) index = num/255;
        else {
            //index = (num*999)/255;
            //System.out.println("Mod .. " + mod + "  index " + index);

            int overflow = 255 - mod;
            index = (65535*overflow + num + overflow)/255;
            System.out.println("overflow "+overflow+" seq "+num+" index "+index);
        }

        return index;
    }

    private void savePacket(Packet packet) {
        int index = getIndex(packet.getSeq_number());

        if(receivedPackets.size() <= index) {
            for(int i = receivedPackets.size(); i <= index; ++i) receivedPackets.add(i, null);
        }
        System.out.println("Saving packet arr-index " + index + "-" + index * 255 + " packet-seq-number "+packet.getSeq_number());
        receivedPackets.set(index, packet);
    }

    private void savePhoto() {
        //for(int i = 0; i < receivedPackets.size(); ++i) System.out.println(i*255 + " " + (receivedPackets.get(i) != null ? receivedPackets.get(i).getSeq_number() : "null"));
        try {
            FileOutputStream fos = new FileOutputStream(new File("./foto.png"));

            IntStream.range(0, receivedPackets.size())
                    .forEach(idx -> {
                        try {
                            if(receivedPackets.get(idx) == null) System.out.println("Error. Packet not found on index " + idx + ", seq number " + idx * 255);
                            else fos.write(receivedPackets.get(idx).getData());
                        } catch (IOException e) {
                            System.out.println(e.toString());
                        }
                    });

            /*this.receivedPackets.stream()
                    .forEach(one -> {
                        try {
                            if(one == null) System.out.println("Error. Packet not found");
                            else fos.write(one.getData());
                        } catch (IOException e) {
                            System.out.println(e.toString());
                        }
                    });
            */

        } catch (FileNotFoundException e) {
            System.out.println(e.toString());
        }

    }

    private int getMissingPacketNumber(Packet packet) {
        //for(int i = 0; i < receivedPackets.size(); ++i) System.out.println(i + " " + (receivedPackets.get(i) != null ? receivedPackets.get(i).getSeq_number() : "null"));

        if(packet.getData().length != 255) {
            lastPack_length = packet.getData().length;
            System.out.println("Packet has not 255b data " + lastPack_length + " ack="+ (next_needed*255 + lastPack_length) +"----------------------------");
            return next_needed*255 + packet.getData().length;
        }

        for(int i = next_needed; i < receivedPackets.size(); ++i) {
            if(receivedPackets.get(i) == null) {
                next_needed = i;
                return i*255;
            }
        }

        if(lastPack_length != 0) {
            System.out.println("------Using lastpacket length: " + lastPack_length);
            //return next_needed*255 + lastPack_length;
        }

        next_needed = receivedPackets.size();
        return receivedPackets.size() * 255;
    }

    private boolean send(Packet packet) {
        ++num_sends;
        System.out.print("---SEND: ");
        printPacket(packet);
        DatagramPacket datagram = createDatagram(packet);
        try {
            this.socket.send(datagram);
        } catch (IOException e) {
            System.out.println(e.toString());
            return false;
        }

        return true;
    }

    private Packet recv() {

        DatagramPacket datagram = new DatagramPacket(new byte[264], 264);
        try {
            socket.receive(datagram);
        } catch (IOException e) {
            System.out.println(e.toString());
            return null;
        }

        Packet packet = new Packet(datagram);
        ++num_recvs;
        //System.out.print("   RECV: ");
        //printPacket(packet);

        return packet;
    }

    private DatagramPacket createDatagram(Packet packet) {
        int length = packet.getData().length + 9;
        ByteBuffer buffer = ByteBuffer.allocate(length);

        buffer.putInt(packet.getId());
        buffer.putShort((short) (packet.getSeq_number() & 0xffff));
        buffer.putShort((short) (packet.getConfirm_number() & 0xffff));
        buffer.put((byte) packet.getFlags());
        buffer.put(packet.getData());

        return new DatagramPacket(buffer.array(), length, remote_address, PORT);
    }

    private void printPacket (Packet packet) {
        StringBuilder out = new StringBuilder();
        out.append("id: " + Integer.toHexString(packet.getId()));
        out.append(", seq: " + packet.getSeq_number());
        out.append(", confirm: " + packet.getConfirm_number());
        out.append(", flags: " + packet.getFlags());
        out.append(", data size: " + packet.getData().length);
        //out.append(" - ");
        //for(byte one : packet.getData()) out.append(one);

        System.out.println(out.toString());
    }
}

class Packet {
    private int id; // identifikator spojeni 4b
    private int seq_number; // sekvencni cislo 2b
    private int confirm_number; // cislo potvrzeni 2b
    private byte flags; // priznak 1b
    private byte[] data;

    public Packet(int id, int seq_number, int confirm_number, byte flags, byte[] data) {
        this.id = id;
        this.seq_number = seq_number;
        this.confirm_number = confirm_number;
        this.flags = flags;
        this.data = data;
    }

    public Packet(DatagramPacket datagram) {
        ByteBuffer buffer = ByteBuffer.wrap(datagram.getData());
        this.id = buffer.getInt();
        this.seq_number = buffer.getShort() & 0xffff;
        this.confirm_number = buffer.getShort() & 0xffff;
        this.flags = buffer.get();
        this.data = new byte[datagram.getLength() - 9];
        for(int i = 0; i < data.length; ++i) this.data[i] = buffer.get();
    }

    public int getId() {
        return id;
    }

    public int getSeq_number() {
        return seq_number;
    }

    public int getConfirm_number() {
        return confirm_number;
    }

    public int getFlags() {
        return flags;
    }

    public byte[] getData() {
        return data;
    }
}
