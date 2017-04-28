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

    getExercises() {
        console.log('getting all exercises');
        return myRealm.objects('Exercise');
    }

    generateTrainingPlans() {
        try {
            myRealm.write(() => myRealm.create('TrainingPlan', {
                    name: 'Training Plan A',
                    exercises: [{
                        name: 'bench',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'biceps',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'triceps',
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
                    name: 'Training Plan B',
                    exercises: [{
                        name: 'deadlift',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'shoulders',
                        weight: 60,
                        noOfSets: 4,
                        noOfRepetitions: 10,
                    }, {
                        name: 'shoulders2',
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
                    name: 'Training Plan C',
                    exercises: [{
                        name: 'legs',
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