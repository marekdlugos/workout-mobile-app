/**
 * Created by railchamidullin on 27/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

import {settingsService} from '../../services/SettingsService';

export default class Dashboard extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right/>
                </Header>

                <Container>


                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Text style={{paddingLeft: 20, fontSize: 30}}>Ready for your today’s training?</Text>
                        <TouchableOpacity style={styles.trainingPlanElement} onPress={() => this}>
                            <View style={styles.trainingPlanElementLeft}>
                                <Text style={styles.boldText}>Upper body</Text>
                                <Text>3 exercises</Text>
                                <Text>~ 1 hour</Text>
                            </View>
                            <View style={styles.trainingPlanElementRight}>
                                <Text style={{fontSize: 30}}>Start</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Container>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    trainingPlanElement: {
        height: 70,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BCBEC0',
        padding: 10,

        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    trainingPlanElementLeft: {
        flexDirection: 'column',
    },
    trainingPlanElementRight: {
        justifyContent: 'center',
        paddingRight: 10,
    },
    blueText: {
        color: '#157EFB',
        fontSize: 18,
    },
    boldText: {
        fontWeight: 'bold',
    },
});