/**
 * Created by railchamidullin on 28/03/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, ScrollView, TouchableOpacity, TouchableHighlight, Navigator, Picker, Animated, Dimensions } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Input, Content, ListItem, List, Form, Item, Label } from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


import {TrainingPlanService} from '../services/TrainingPlanService';

const trainingPlanService = TrainingPlanService.getInstance();

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default class ExercisesList extends Component {
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
            id: 'Exercise',
            trainingPlan: this.props.trainingPlan,
            exercise: exercise,
        });
    }

    addExercise() {
        this.props.navigator.push({
            id: 'NewExerciseForm',
            trainingPlan: this.props.trainingPlan,
            updateFunction: this.updateListView.bind(this),
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });
    }

    startTraining() {

    }



    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.backButton()} title="">
                            <Icon name='arrow-back' />
                            <Text style={styles.blueText}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>My Exercises</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.addExercise()} title="">
                            <Icon name='add'/>
                        </Button>
                    </Right>
                </Header>

                <Container >
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

                    <ListView dataSource={this.state.dataSource} renderRow={(rowData) => this._renderRow(rowData)}/>
                </Container>



            </Container>
        );
    }

    animatedScroll(e) {
        console.log(e.nativeEvent.contentOffset.x);
        /*
        const width = Dimensions.get('window');

        const threshold = width / 5;
        let x = e.nativeEvent.contentOffset.x;
        let swiped = null;

        x = x * -1;

        console.log("a");
        if (x > -50 && this.state.swiped !== WHITE) {
            swiped = WHITE;
        } else if (x < -50 && x > -threshold && this.state.swiped !== GREEN) {
            swiped = GREEN;
        }

        console.log("a2");
        if (swiped !== null) {
            this.setState({swiped: swiped});

            Animated.timing(this.state.color, {
                toValue: swiped,
                duration: 200
            }).start();
        }*/
    }

    _renderRow(rowData){
        /*const bgColor = this.state.color.interpolate({
            inputRange: [
                WHITE,
                GREEN
            ],
            outputRange: [
                'rgb(255, 255, 255)',
                'rgb(123, 204, 40)'
            ]
        });*/

        return (
            <AnimatedScrollView horizontal={true} directionalLockEnabled={true} onScroll={this.animatedScroll} scrollEventThrottle={16}>
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
            </AnimatedScrollView>
        );
    }
}

ExercisesList.propTypes = {
    navigator: React.PropTypes.any.isRequired,
    trainingPlan: React.PropTypes.any.isRequired
};

export class Exercise extends Component {
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
                    <Body>
                    <Title>My Exercises</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                <Container>
                    <View style={styles.header}>
                        <Text>{this.props.exercise.name}</Text>

                        <View style={styles.rightSideOfHeader}>
                            <Text>{this.props.exercise.weight} kilograms</Text>
                            <Text>{this.props.exercise.noOfSets} sets</Text>
                            <Text>{this.props.exercise.noOfRepetitions} repetitions</Text>
                        </View>
                    </View>
                </Container>



            </Container>
        );
    }
}

Exercise.propTypes = {
    navigator: React.PropTypes.any.isRequired,
    trainingPlan: React.PropTypes.any.isRequired,
    exercise: React.PropTypes.any.isRequired,
};

export class NewExerciseForm extends Component {
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

NewExerciseForm.propTypes = {
    navigator: React.PropTypes.any.isRequired,
    trainingPlan: React.PropTypes.any.isRequired,
    updateFunction: React.PropTypes.any.isRequired,
};

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
        width: 345,
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

