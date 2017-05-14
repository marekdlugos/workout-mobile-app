/**
 * Created by railchamidullin on 26/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator, NavigatorIOS } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

import TrainingPlanList from './components/trainingPlan/TrainingPlanList';
import UserSettings from './components/user/UserSettings';
import Statistics from './components/statistics/Statistics';
import Dashboard from './components/dashboard/Dashboard';

import {currentStateService} from './services/ActualStateService';
import {trainingPlanService} from './services/TrainingPlanService';
import ExerciseList from './components/trainingPlan/ExercisesList';

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
                               return Navigator.SceneConfigs.FloatFromRight;
                           }} />

                <CurrentTrainingPlan/>
                <AppFooter/>
            </Container>

        );
    }

    renderScene(route, navigator) {
        appNavigator = navigator;
        let screen = route.component;
        if(route.id === 'initial') screen = (<TrainingPlanList navigator={navigator}/>);

        return (
            <Container>
                {screen}
            </Container>
        );
    }
}

class CurrentTrainingPlan extends Component {
    constructor(props) {
        super(props);

        let currentTrainingPlanName = currentStateService.getCurrentTrainingPlanName();
        this.state = {
            currentTrainingPlan: trainingPlanService.getTrainingPlanByPrimaryKey(currentTrainingPlanName),
        };

        currentStateService.setCurrentTrainingPlanModificationListener((object) => {
            if(object) this.setState({currentTrainingPlan: trainingPlanService.getTrainingPlanByPrimaryKey(object.currentTrainingPlanName)})
        })
    }

    goToExercises(trainingPlan) {
        console.log("go to exercises from currentTrainingPlan panel");
        appNavigator.push({
            component: <ExerciseList navigator={appNavigator} trainingPlan={trainingPlan}/>,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });
    }

    render() {
        if(!this.state.currentTrainingPlan) return (<View/>);

        return (
            <TouchableOpacity style={styles.currentTrainingPlanPanel} onPress={() => this.goToExercises(this.state.currentTrainingPlan)}>
                <Text style={styles.boldText}>Current training: {this.state.currentTrainingPlan.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    currentTrainingPlanPanel: {
        paddingLeft: 10,
        justifyContent: 'space-around',
        height: 50,
        backgroundColor: '#4e92DF',
    },
    boldText: {
        fontWeight: 'bold',
        color:'white',
    },
});

class AppFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 2
        };
    }

    openDashboard() {
        this.setState({activeButton: 1});
        appNavigator.resetTo({
            component: <Dashboard navigator={appNavigator}/>,
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
            component: <Statistics navigator={appNavigator}/>,
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
                        <Icon name="home" />
                        <Text>Home</Text>
                    </Button>
                    <Button active={this.state.activeButton === 2} onPress={() => this.openTrainingPlans()} title="">
                        <Icon name="bicycle" />
                        <Text>Trainings</Text>
                    </Button>
                    <Button active={this.state.activeButton === 3} onPress={() => this.openStatistics()} title="">
                        <Icon active name="calendar" />
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
