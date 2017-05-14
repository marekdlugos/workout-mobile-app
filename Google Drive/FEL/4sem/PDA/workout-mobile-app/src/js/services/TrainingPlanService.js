/**
 * Created by railchamidullin on 01/04/2017.
 */

import {myRealm} from '../config/Config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class TrainingPlanService {

    constructor(enforcer) {
        if(enforcer != singletonEnforcer) throw "Cannot construct TrainingPlanService singleton";
    }

    static getInstance() {
        if(!this[singleton]) {
            this[singleton] = new TrainingPlanService(singletonEnforcer);
            this.getInstance().generateTrainingPlans();
        }
        return this[singleton];
    }

    createTrainingPlan(trainingPlan) {
        return myRealm.create('TrainingPlan', {
            name: trainingPlan.name,
            exercises: null,
        });
    }

    saveTrainingPlan(trainingPlan) {
        myRealm.write(() => {this.createTrainingPlan(trainingPlan)});
    }

    addExercise(trainingPlan, exercise) {
        try {
            myRealm.write(() => {
                trainingPlan.exercises.push(exercise);
            });
        } catch (err) {
            console.log("TrainingPlanService was unable to add exercise due error: " + err);
            console.log(trainingPlan);
            console.log(exercise);
        }
    }

    getTrainingPlans() {
        console.log("getting all training plans");
        return myRealm.objects('TrainingPlan');
    }

    getTrainingPlanByPrimaryKey(key) {
        return myRealm.objectForPrimaryKey('TrainingPlan', String(key));
    }

    getExercises() {
        console.log('getting all exercises');
        return myRealm.objects('Exercise');
    }

    setTrainingPlanListener(func) {
        myRealm.objects('TrainingPlan').addListener((objects, changes) => {
            console.log('training plan has changed')

            changes.insertions.forEach((index) => func())

            changes.modifications.forEach((index) => func())

            changes.deletions.forEach((index) => func())
        })
    }


    generateTrainingPlans() {
        try {
            myRealm.write(() => myRealm.create('TrainingPlan', {
                    name: 'Upper body',
                    exercises: [{
                        name: 'Benchpress',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'Biceps',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'Triceps',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }],
                })
            );
        } catch (error) {
            console.log('unable to create training plans due to error: '+error);
        }

        try {
            myRealm.write(() => myRealm.create('TrainingPlan', {
                    name: 'Back',
                    exercises: [{
                        name: 'Deadlift',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'Row machine',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'Vertical push',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }],
                })
            );
        } catch (error) {
            console.log('unable to create training plans due to error: '+error);
        }

        try {
            myRealm.write(() => myRealm.create('TrainingPlan', {
                    name: 'Legs',
                    exercises: [{
                        name: 'Legs',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'legs2',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'legs3',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }],
                })
            );
        } catch (error) {
            console.log('unable to create training plans due to error: '+error);
        }
    }
}

export const trainingPlanService = TrainingPlanService.getInstance();