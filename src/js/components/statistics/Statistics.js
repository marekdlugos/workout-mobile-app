/**
 * Created by railchamidullin on 27/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

import {trainingPlanService} from '../../services/TrainingPlanService';
import {recordOfTrainingPlanService} from '../../services/RecordOfTrainingPlanService';
import {settingsService} from '../../services/SettingsService';
import {currentStateService} from '../../services/ActualStateService';

export default class Statistics extends Component {
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
                    <Left>

                    </Left>
                    <Body>
                    <Title>Stats</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <Content>
                    <List dataArray={recordOfTrainingPlanService.getRecordsOfTrainingPlans()} renderRow={(item) =>
                        <ListItem style={{height: 100}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text>{item.id}</Text>
                                <Text>{item.trainingPlanName}</Text>
                                <Text>{item.startOfTraining == null ? 'none' : item.startOfTraining.toString()}</Text>
                                <Text>{item.endOfTraining == null ? 'none' : item.endOfTraining.toString()}</Text>
                                <Text>{item.exercises.length}</Text>
                            </View>
                        </ListItem>
                    }/>
                </Content>

            </Container>
        );
    }
}
