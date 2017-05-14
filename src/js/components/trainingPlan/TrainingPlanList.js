/**
 * Created by railchamidullin on 28/03/2017.
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, TouchableHighlight, Navigator, Picker } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Input, Content, ListItem, List, Form, Item, Label } from 'native-base';



import ExerciseList, {NewExerciseForm, Exercise} from './ExercisesList';
import {trainingPlanRest} from '../../rest/TrainingPlanRest'


import {trainingPlanService} from '../../services/TrainingPlanService';
import {currentStateService} from '../../services/ActualStateService';

export default class TrainingPlanList extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let trainingPlans = trainingPlanService.getTrainingPlans();

        this.state = {
            dataSource: ds.cloneWithRows(trainingPlans),
            currentTrainingPlanName: currentStateService.getCurrentTrainingPlanName()
        };

        trainingPlanRest.getTrainingPlan()
    }

    componentDidMount(){
        currentStateService.setCurrentTrainingPlanModificationListener((object) => {
            if(object) {
                this.setState({currentTrainingPlanName: object.currentTrainingPlanName});
                this.updateListView()
            }
        });
    }

    updateListView() {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(trainingPlanService.getTrainingPlans())});
    }

    goToExercises(trainingPlan) {
        console.log("go to exercises");
        this.props.navigator.push({
            component: <ExerciseList navigator={this.props.navigator} trainingPlan={trainingPlan}/>
        });
    }

    addTrainingPlan() {
        console.log("add new training plan");
        this.props.navigator.push({
            component: <NewTrainingPlanForm navigator={this.props.navigator} updateFunction={() => this.updateListView()}/>,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body><Title>Header</Title></Body>
                    <Right>
                        <Button transparent onPress={() => this.addTrainingPlan()} title="">
                            <Icon name='add' style={{fontSize: 35}}/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <ListView dataSource={this.state.dataSource} enableEmptySections={true} renderRow={(rowData) =>
                        <TouchableOpacity style={[styles.trainingPlanElement, this.state.currentTrainingPlanName == rowData.name ? {backgroundColor: '#F4F4F4'} : null]} onPress={() => this.goToExercises(rowData)}>
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

class NewTrainingPlanForm extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        updateFunction: React.PropTypes.func.isRequired
    };

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
        this.props.updateFunction(); // rerender list of training plans
    }

    render() {
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.backButton()} title="">
                            <Text style={styles.blueText}>Cancel</Text>
                        </Button>
                    </Left>
                    <Body><Title>New Training</Title></Body>
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