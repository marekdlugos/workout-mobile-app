/**
 * Created by railchamidullin on 24/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

import {settingsService} from '../../services/SettingsService';

export default class UserSettings extends Component {
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
                    <Title>Me</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <Content>
                    <List>
                        <ListItem button onPress={() => this.props.navigator.push({component: <SettingsPicker navigator={this.props.navigator} databaseFunction={(item) => settingsService.setUnits(item)} title="Units" items={["Kilograms", "Pounds"]}/>})}>
                            <Left>
                                <Text>Units</Text>
                            </Left>
                            <Right>
                                <Text>{settingsService.getUnits()}</Text>
                            </Right>
                        </ListItem>

                        <ListItem button onPress={() => this.props.navigator.push({component: <SettingsPicker navigator={this.props.navigator} databaseFunction={(item) => settingsService.setWeightIncreasing(item == "On")} title="Automatic weight increasing" items={["On", "Off"]}/>})}>
                            <Left>
                                <Text>Automatic weight increasing</Text>
                            </Left>
                            <Right>
                                <Text>{settingsService.getWeightIncreasing() == true ? 'On' : 'Off'}</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>

            </Container>
        );
    }
}

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


const styles = StyleSheet.create({

});
