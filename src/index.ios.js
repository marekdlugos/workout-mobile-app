/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';
import Realm from 'realm'

import TrainingPlanScreen from './components/TrainingPlanList';
import ExercisesList from './components/ExercisesList';

// Press Cmd+R to reload, Cmd+D or shake for dev menu

export default class WorkoutApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        screen: 0,
    };



  }

  /*

    // Create Realm objects and write to local storage
    realm.write(() => {
    let myCar = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 1000,
    });
    myCar.miles += 20; // Update a property value
});

// Query Realm for all cars with a high mileage
let cars = realm.objects('Car').filtered('miles > 1000');

// Will return a Results object with our 1 car
cars.length // => 1

// Add another car
realm.write(() => {
    let myCar = realm.create('Car', {
        make: 'Ford',
        model: 'Focus',
        miles: 2000,
    });
});

// Query results are updated in realtime
cars.length //
*/

  switchScreen(index) {
      console.log(index);
      this.setState({screen: index});
  }

  setComponent() {
      switch (this.state.screen) {
          case 0:
              return TrainingPlanScreen;
              break;
          case 1:
              return TrainingPlanScreen;
              break;
          case 2:
              return TrainingPlanScreen;
              break;
          case 3:
              return TrainingPlanScreen;
              break;
          default:
              return TrainingPlanScreen;
              break;
      }
  }

  render() {
    let AppComponent = this.setComponent();

    return (
        <Container>
            <AppComponent/>

            <Footer>
                <FooterTab>
                    <Button onPress={() => this.switchScreen(0)} title="">
                        <Icon name="apps" />
                        <Text>Dashboard</Text>
                    </Button>
                    <Button onPress={() => this.switchScreen(1)} title="">
                        <Icon name="camera" />
                        <Text>Trainings</Text>
                    </Button>
                    <Button active onPress={() => this.switchScreen(2)} title="">
                        <Icon active name="navigate" />
                        <Text>Stats</Text>

                    </Button>
                    <Button onPress={() => this.switchScreen(3)} title="">
                        <Icon name="person" />
                        <Text>Me</Text>
                    </Button>

                </FooterTab>
            </Footer>


        </Container>
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

AppRegistry.registerComponent('WorkoutApp', () => WorkoutApp);
