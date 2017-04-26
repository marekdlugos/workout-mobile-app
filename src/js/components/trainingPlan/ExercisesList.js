/**
 * Created by railchamidullin on 28/03/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, ScrollView, TouchableOpacity, TouchableHighlight, Navigator, Picker, Animated, Dimensions } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Input, Content, ListItem, List, Form, Item, Label } from 'native-base';

import {trainingPlanService} from '../../services/TrainingPlanService';

export default class ExercisesList extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        trainingPlan: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let exercises = this.props.trainingPlan.exercises;
        this.state = {
            dataSource: ds.cloneWithRows(exercises),
            ds: ds,
        };
    }

    updateListView() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.trainingPlan.exercises),
        });
    }

    backButton() {
        this.props.navigator.pop();
    }

    goToExercise(exercise){
        this.props.navigator.push({
            component: <Exercise navigator={this.props.navigator} trainingPlan={this.props.trainingPlan} exercise={exercise}/>
        });
    }

    addExercise() {
        this.props.navigator.push({
            component: <NewExerciseForm navigator={this.props.navigator} trainingPlan={this.props.trainingPlan} updateFunction={this.updateListView.bind(this)}/>,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });
    }

    startTraining() {
        console.log("not implemented yet");
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
                    <Body><Title>My Exercises</Title></Body>
                    <Right>
                        <Button transparent onPress={() => this.addExercise()} title="">
                            <Icon name='add'/>
                        </Button>
                    </Right>
                </Header>

                <Container>
                    <View style={styles.header}>
                        <View style={styles.leftSideOfHeader}>
                            <Text>image</Text>
                        </View>

                        <View style={styles.rightSideOfHeader}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.trainingPlan.name}</Text>
                            <Text>{this.props.trainingPlan.exercises.length} exercises to go</Text>
                            <Button small block light onPress={this.startTraining} title=""><Text>Start training</Text></Button>
                        </View>
                    </View>

                    <ListView dataSource={this.state.dataSource} renderRow={(rowData) => this._renderRow(rowData)} enableEmptySections={true}/>
                </Container>
            </Container>
        );
    }

    _renderRow(rowData){
        return (
            <TouchableOpacity style={styles.exerciseElement} onPress={() => this.goToExercise(rowData)}>

                <View style={styles.leftSideOfElement}>
                    <Text style={{fontWeight: 'bold', fontSize: 18,}}>{rowData.name}</Text>
                    <Text>{rowData.noOfSets} Sets</Text>
                    <Text>{rowData.noOfRepetitions} Repetitions</Text>
                </View>

                <View style={styles.rightSideOfElement}>
                    <Text style={{fontSize: 35}}>{rowData.weight} Kg</Text>
                </View>

            </TouchableOpacity>
        );
    }
}

export class Exercise extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        trainingPlan: React.PropTypes.object.isRequired,
        exercise: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    backButton() {
        this.props.navigator.pop();
    }

    render() {
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.backButton()} title="">
                            <Icon name='arrow-back' />
                            <Text style={styles.blueText}>Back</Text>
                        </Button>
                    </Left>
                    <Body><Title>My Exercises</Title></Body>
                    <Right/>
                </Header>

                <View>
                    <View style={exerciseStyles.exerciseName}>
                        <Text style={{fontSize: 28, color: '#49494A'}}>{this.props.exercise.name}</Text>
                    </View>

                    <View style={exerciseStyles.circles}>
                        <View style={exerciseStyles.weightCircle}>
                            <Text style={{fontSize: 40}}>{this.props.exercise.weight}</Text>
                            <Text>kilograms</Text>
                        </View>
                        <View style={exerciseStyles.setsCircle}>
                            <Text style={{fontSize: 30}}>{this.props.exercise.noOfSets}</Text>
                            <Text>sets</Text>
                        </View>
                        <View style={exerciseStyles.repetitionsCircle}>
                            <Text style={{fontSize: 30}}>{this.props.exercise.noOfRepetitions}</Text>
                            <Text>repetitions</Text>
                        </View>
                    </View>


                    <View style={exerciseStyles.completeButton}>
                        <Text>Not today</Text>

                        <Text>Success</Text>

                    </View>
                </View>



            </Container>
        );
    }
}

const exerciseStyles = StyleSheet.create({
    exerciseName: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 25,
    },
    circles: {
        alignItems: 'center',
    },
    weightCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#49494A',
        borderWidth: 1,
        borderRadius: 100,
        width: 160,
        height: 160,
    },
    repetitionsCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#49494A',
        borderWidth: 1,
        borderRadius: 100,

        backgroundColor: 'white',
        width: 110,
        height: 110,
        marginTop: -100,
        marginLeft: -150,
    },
    setsCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#49494A',
        borderWidth: 1,
        borderRadius: 100,

        backgroundColor: 'white',
        width: 90,
        height: 90,
        marginTop: -40,
        marginLeft: 160,
    },
    completeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: '#49494A',
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 40,
        marginHorizontal: 30,
        padding: 20,
    },
    animatedScroll: {
        justifyContent: 'center',
        width: 350,
        position: 'absolute',
        borderColor: '#49494A',
        borderWidth: 1,
        

    }
});

export class NewExerciseForm extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        trainingPlan: React.PropTypes.object.isRequired,
        updateFunction: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            weight: '',
            noOfSets: '',
            noOfRepetitions: '',
        };
    }

    backButton() {
        this.props.navigator.pop();
    }

    saveButton() {
        let exercise = {
             name: this.state.name,
             weight: parseInt(this.state.weight),
             noOfSets: parseInt(this.state.noOfSets),
             noOfRepetitions: parseInt(this.state.noOfRepetitions),
         };
        trainingPlanService.addExercise(this.props.trainingPlan, exercise);

        this.props.navigator.pop();
        this.props.updateFunction();
    }

    render() {
        let saveButtonIsDisabled = !(this.state.name != '' && this.state.weight != '' && this.state.noOfSets != '' && this.state.noOfRepetitions != '');

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
                        <Button disabled={saveButtonIsDisabled} transparent onPress={() => this.saveButton()} title="">
                            <Text style={saveButtonIsDisabled ? styles.grayText : styles.blueText}>Save</Text>
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
                            <Label style={{fontWeight: 'bold'}} >Weight</Label>
                            <Input keyboardType="number-pad" placeholder="required" onChangeText={(value) => this.setState({weight: value})} />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{fontWeight: 'bold'}} >Number of sets</Label>
                            <Input keyboardType="number-pad" placeholder="required" onChangeText={(value) => this.setState({noOfSets: value})} />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{fontWeight: 'bold'}} >Number of repetitions</Label>
                            <Input keyboardType="number-pad" placeholder="required" onChangeText={(value) => this.setState({noOfRepetitions: value})} />
                        </Item>
                    </Form>

                </Content>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 120,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',

        marginTop: 15,
        borderBottomWidth: 1,
        borderColor: '#BCBEC0',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    leftSideOfHeader: {
        marginVertical: 10,
        width: 100,
        borderWidth: 1,
        borderColor: '#BCBEC0',
    },
    rightSideOfHeader: {
        flex: 1,
        justifyContent: 'space-around',
        paddingLeft: 10,
    },

    exerciseElement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BCBEC0',
        padding: 10,
    },
    leftSideOfElement: {
        justifyContent: 'space-around',
        marginLeft: 8,
    },

    rightSideOfElement: {
        justifyContent: 'center',
        marginRight: 8,
    },

    blueText: {
        color: '#157EFB',
        fontSize: 18,
    },

    grayText: {
        borderColor: '#BCBEC0',
        fontSize: 18,
    },


});

