/**
 * Created by railchamidullin on 26/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator, NavigatorIOS } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

import TrainingPlanList from './components/trainingPlan/TrainingPlanList';
import UserSettings from './components/user/UserSettings';

// Press Cmd+R to reload, Cmd+D or shake for dev menu

let appNavigator;

export default class WorkoutApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Navigator initialRoute={{id: 'initial'}} renderScene={(route, navigator) => this.renderScene(route, navigator)}
                    configureScene={(route) => {
                        if (route.sceneConfig) return route.sceneConfig;
                        return Navigator.SceneConfigs.HorizontalSwipeJump;
                    }} />

                <AppFooter/>
            </Container>

        );
    }

    renderScene(route, navigator) {
        appNavigator = navigator;
        var screen = route.component;
        if(route.id === 'initial') screen = (<TrainingPlanList navigator={navigator}/>);

        return (
            <Container>
                {screen}
            </Container>
        );
    }
}

class AppFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 1
        };

        console.log(this.props.navigator);
    }

    openDashboard() {
        this.setState({activeButton: 1});
        appNavigator.resetTo({
            component: <TrainingPlanList navigator={appNavigator}/>,
        });
    }

    openTrainingPlans() {
        this.setState({activeButton: 2});
        appNavigator.resetTo({
            component: <TrainingPlanList navigator={appNavigator}/>,
        });
    }

    openStatistics() {
        this.setState({activeButton: 3});
        appNavigator.resetTo({
            component: <UserSettings navigator={appNavigator}/>,
        });
    }

    openUserSettings() {
        this.setState({activeButton: 4});
        appNavigator.resetTo({
            component: <UserSettings navigator={appNavigator}/>,
        });
    }

    render() {

        return (
            <Footer>
                <FooterTab>
                    <Button active={this.state.activeButton === 1} onPress={() => this.openDashboard()} title="">
                        <Icon name="apps" />
                        <Text>Home</Text>
                    </Button>
                    <Button active={this.state.activeButton === 2} onPress={() => this.openTrainingPlans()} title="">
                        <Icon name="camera" />
                        <Text>Trainings</Text>
                    </Button>
                    <Button active={this.state.activeButton === 3} onPress={() => this.openStatistics()} title="">
                        <Icon active name="navigate" />
                        <Text>Stats</Text>

                    </Button>
                    <Button active={this.state.activeButton === 4} onPress={() => this.openUserSettings()} title="">
                        <Icon name="person" />
                        <Text>Me</Text>
                    </Button>

                </FooterTab>
            </Footer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
