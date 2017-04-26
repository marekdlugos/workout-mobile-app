/**
 * Created by railchamidullin on 28/03/2017.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, TouchableHighlight, Navigator, Picker } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Input, Content, ListItem, List, Form, Item, Label } from 'native-base';



import ExerciseList, {NewExerciseForm, Exercise} from './ExercisesList';


import {TrainingPlanService} from '../../services/TrainingPlanService';

const trainingPlanService = TrainingPlanService.getInstance();

export default class TrainingPlanScreen extends Component {
    //mixins: [Flux.listenTo(TrainingPlanStore,"onUserLoaded")];
    constructor(props) {
        super(props);
        this.state = {screen: 'trainingPlanList'};
    }

    render() {
        const routes = [
            {title: 'First Scene', index: 0},
            {title: 'Second Scene', index: 1},
        ];

        return (
            <Navigator
                initialRoute={{id: 'TrainingPlanList', data: null}}
                renderScene={(route, navigator) => this.renderScene(route, navigator)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }} />

        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'TrainingPlanList':
                return (<TrainingPlanList navigator={navigator}/>);
                break;
            case 'ExerciseList':
                return (<ExerciseList navigator={navigator} trainingPlan={route.trainingPlan}/>);
                break;
            case 'NewTrainingPlanForm':
                return (<NewTrainingPlanForm navigator={navigator} updateFunction={route.updateFunction}/>);
                break;
            case 'NewExerciseForm':
                return (<NewExerciseForm navigator={navigator} trainingPlan={route.trainingPlan} updateFunction={route.updateFunction}/>);
                break;
            case 'Exercise':
                return (<Exercise navigator={navigator} trainingPlan={route.trainingPlan} exercise={route.exercise}/>);
                break;
        }


    }

}

class NewTrainingPlanForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repetition: '',
            daysOfWeek: '',
        };
    }

    backButton() {
        this.props.navigator.pop();
    }

    saveButton() {
        let newTrainingPlan = {
            name: this.state.name,
            repetition: this.state.repetition,
            daysOfWeek: this.state.daysOfWeek,
        };
        trainingPlanService.saveTrainingPlan(newTrainingPlan);
        this.props.navigator.pop();

        console.log(trainingPlanService.getTrainingPlans().length);
        this.props.updateFunction();
    }

    render() {
        console.log(trainingPlanService.getTrainingPlans().length);

        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.backButton()} title="">
                            <Text style={styles.blueText}>Cancel</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>New TrainingPlan</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.saveButton()} title="">
                            <Text style={styles.blueText}>Save</Text>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label style={{fontWeight: 'bold'}}>Name</Label>
                            <Input placeholder="required" onChangeText={(value) => this.setState({name: value})} />
                        </Item>
                        <Item fixedLabel>
                            <Label style={{fontWeight: 'bold'}} >Repetition</Label>
                            <Input placeholder="optional" onChangeText={(value) => this.setState({repetition: value})} />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{fontWeight: 'bold'}} >Days of week</Label>
                            <Input placeholder="optional" onChangeText={(value) => this.setState({daysOfWeek: value})} />
                        </Item>
                    </Form>

                </Content>
            </Container>

        );
    }
}

NewTrainingPlanForm.propTypes = {
    navigator: React.PropTypes.any.isRequired
};

class TrainingPlanList extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        let trainingPlans =  trainingPlanService.getTrainingPlans();

        this.state = {
            dataSource: ds.cloneWithRows(trainingPlans),
            ds: ds,
        };

    }

    updateListView() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(trainingPlanService.getTrainingPlans()),
        });
    }

    goToExercises(trainingPlan) {
        this.props.navigator.push({
            id: 'ExerciseList',
            trainingPlan: trainingPlan,
        });
    }

    addTrainingPlan() {
        console.log("add training plan ");
        this.props.navigator.push({
            id: 'NewTrainingPlanForm',
            updateFunction: this.updateListView.bind(this),
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });

    }

    render() {

        return (
            <Container>

                <Header>
                    <Left></Left>

                    <Body>
                        <Title>Header</Title>
                    </Body>

                    <Right>
                        <Button transparent onPress={() => this.addTrainingPlan()} title="">
                            <Icon name='add'/>
                        </Button>
                    </Right>
                </Header>

                <Content>

                    <ListView dataSource={this.state.dataSource} renderRow={(rowData) =>
                        <TouchableOpacity style={styles.trainingPlanElement} onPress={() => this.goToExercises(rowData)}>
                            <View style={styles.trainingPlanElementLeft}>
                                <Text style={styles.boldText}>{rowData.name}</Text>
                                <Text>{rowData.exercises.length} exercises</Text>
                                <Text>~ 1 hour</Text>
                            </View>
                        </TouchableOpacity>
                    }/>


                </Content>



            </Container>
        );
    }
}

TrainingPlanList.propTypes = {
    navigator: React.PropTypes.any.isRequired
};

const styles = StyleSheet.create({
    trainingPlanElement: {
        height: 70,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BCBEC0',
        padding: 10,
    },
    trainingPlanElementLeft: {

    },
    blueText: {
        color: '#157EFB',
        fontSize: 18,
    },
    boldText: {
        fontWeight: 'bold',
    },
});