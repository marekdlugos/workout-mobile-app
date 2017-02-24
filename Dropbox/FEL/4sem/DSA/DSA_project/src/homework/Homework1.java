package homework;

import java.util.Arrays;

/**
 * Created by railchamidullin on 24/02/2017.
 */
public class Homework1 implements Mergesort {

    @Override
    public int[] getFirstHalfOf(int[] array) {
        return Arrays.copyOfRange(array, 0, array.length/2);
    }

    @Override
    public int[] getSecondHalfOf(int[] array) {
        return Arrays.copyOfRange(array, array.length/2, array.length);
    }

    @Override
    public int[] merge(int[] firstHalf, int[] secondHalf) {
        int sizeOfMergedArray = firstHalf.length + secondHalf.length;
        int[] mergedArray = new int[sizeOfMergedArray];

        for(int i = 0, indexOfFirst = 0, indexOfSecond = 0; i < sizeOfMergedArray; ++i) {
            if(indexOfFirst >= firstHalf.length) {
                mergedArray[i] = secondHalf[indexOfSecond++];
            } else if(indexOfSecond >= secondHalf.length) {
                mergedArray[i] = firstHalf[indexOfFirst++];
            } else {
                if(firstHalf[indexOfFirst] < secondHalf[indexOfSecond]) {
                    mergedArray[i] = firstHalf[indexOfFirst++];
                } else {
                    mergedArray[i] = secondHalf[indexOfSecond++];
                }
            }
        }

        return mergedArray;
    }

    @Override
    public int[] mergesort(int[] array) {
        if(array.length < 2) return array;
        if(array.length == 2) {
            if(array[0] > array[1]) {
                int tmp = array[0];
                array[0] = array[1];
                array[1] = tmp;
            }
            return array;
        }


        int[] leftArray = getFirstHalfOf(array);
        int[] rightArray = getSecondHalfOf(array);

        return merge(mergesort(leftArray), mergesort(rightArray));
    }
}

/*
 * Naimplementujte třídu Homework1 implementující rozhraní Mergesort.
 */
interface Mergesort {

    // vrati nesetridenou kopii prvni poloviny (horni celou cast) pole array

    int[] getFirstHalfOf(int[] array);

    // vrati nesetridenou kopii druhe poloviny (dolni celou cast) pole array

    int[]getSecondHalfOf(int[] array);

    // slije prvky v firstHalf a secondHalf do jednoho pole a vrati ho

    int[]merge(int[] firstHalf, int[] secondHalf);

    // vrati setridenou kopii pole array

    int[]mergesort(int[] array);

}
