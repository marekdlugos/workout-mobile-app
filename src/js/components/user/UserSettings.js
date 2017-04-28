/**
 * Created by railchamidullin on 24/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator, TextInput } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Input, Form, Footer, FooterTab, Content, ListItem, List } from 'native-base';

import {settingsService} from '../../services/SettingsService';

export default class UserSettings extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            nameOfUser: settingsService.getNameOfUSer(),
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                    <Title>Me</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <View>
                    <View style={styles.header}>
                        <View style={styles.picture}><Icon name="camera" style={{fontSize: 50}}/></View>

                        <TextInput style={{height: 30, marginTop: 25, fontSize: 25}} value={this.state.nameOfUser} textAlign="center" onChangeText={(e) => this.setState({nameOfUser: e})}
                                   onSubmitEditing={(event) => settingsService.setNameOfUser(event.nativeEvent.text)} autoCorrect={false}/>

                    </View>


                    <List>
                        <ListItem button onPress={() => this.props.navigator.push({component: <SettingsPicker navigator={this.props.navigator} databaseFunction={(item) => settingsService.setUnits(item)} title="Units" items={["Kilograms", "Pounds"]}/>})}>
                            <Left>
                                <Text>Units</Text>
                            </Left>
                            <Right>
                                <Text style={{color: '#989898'}}>{settingsService.getUnits()}</Text>

                            </Right>
                        </ListItem>

                        <ListItem button onPress={() => this.props.navigator.push({component: <SettingsPicker navigator={this.props.navigator} databaseFunction={(item) => settingsService.setWeightIncreasing(item == "On")} title="Automatic weight increasing" items={["On", "Off"]}/>})}>
                            <Left>
                                <Text>Automatic weight increasing</Text>
                            </Left>
                            <Right>
                                <Text style={{color: '#989898'}}>{settingsService.getWeightIncreasing() == true ? 'On' : 'Off'}</Text>

                            </Right>
                        </ListItem>
                    </List>

                </View>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex:0,
        height: 170,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',

        marginTop: 15,
        borderBottomWidth: 1,
        borderColor: '#BCBEC0',
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    picture: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 50,
        marginVertical: 20,

        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#49494A',

    },
});

class SettingsPicker extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        items: React.PropTypes.array.isRequired,
        title: React.PropTypes.string.isRequired,
        databaseFunction: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    backButton() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.backButton()} title="">
                            <Icon name='arrow-back' />
                            <Text style={styles.blueText}>Back</Text>
                        </Button>
                    </Left>
                    <Body><Title>{this.props.title}</Title></Body>
                    <Right/>
                </Header>

                <Content>
                    <List dataArray={this.props.items} renderRow={(item) =>
                        <ListItem button onPress={() => {
                            this.props.databaseFunction(item);
                            this.props.navigator.pop();
                        }}>
                            <Left>
                                <Text>{item}</Text>
                            </Left>
                        </ListItem>
                    }/>
                </Content>

            </Container>
        );
    }
}
