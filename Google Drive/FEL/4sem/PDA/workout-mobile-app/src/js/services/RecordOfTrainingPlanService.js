/**
 * Created by railchamidullin on 27/04/2017.
 */
'use strict';

import {myRealm} from '../config/Config';
import {trainingPlanService} from './TrainingPlanService';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class RecordOfTrainingPlanService {

    constructor(enforcer) {
        if(enforcer != singletonEnforcer) throw "Cannot construct TrainingPlanService singleton";
    }

    static getInstance() {
        if(!this[singleton]) {
            this[singleton] = new RecordOfTrainingPlanService(singletonEnforcer);
            //RecordOfTrainingPlanService.getInstance().generateRecordsOfTrainingPlans();
        }
        return this[singleton];
    }

    generateRecordsOfTrainingPlans() {
        let trainingPlan = trainingPlanService.getTrainingPlans()[0];
        for(let j = 0; j < 3; ++j) {
            for (let i = 0; i < 10; ++i) {
                this.createRecordOfTrainingPlan(trainingPlan, new Date(2017, 4+j, 1+3*i));
            }
        }
    }

    createRecordOfExercise(exercise) {
        return {
            exerciseName: exercise.name,
            weight: exercise.weight,
            noOfSets: exercise.noOfSets,
            noOfRepetitions: exercise.noOfRepetitions,
        };
    }

    setEndTimeOfRecordOfTrainingPlan(recordOfTrainingPlan, endOfTraining) {
        myRealm.write(() => recordOfTrainingPlan.endOfTraining = endOfTraining);
    }

    setCompletionOfExercise(recordOfExercise, isCompleted) {
        myRealm.write(() => recordOfExercise.completed = isCompleted);
    }

    createRecordOfTrainingPlan(trainingPlan, startOfTraining) {
        console.log('creating record of training plan');

        let exercises = [];
        for(let i = 0; i < trainingPlan.exercises.length; ++i) exercises.push(this.createRecordOfExercise(trainingPlan.exercises[i]));

        let id = this.generateRecordOfTrainingPlanId();

        myRealm.write(() => myRealm.create('RecordOfTrainingPlan', {
            id: id,
            trainingPlanName: trainingPlan.name,
            startOfTraining: startOfTraining,
            exercises: exercises,
        }));

        let record = this.getRecordOfTrainingPlan(id);
        if(record == null) console.log("Something went wrong, saved record of training plan is null");

        return record;
    }

    generateRecordOfTrainingPlanId() {
        return this.getRecordsOfTrainingPlans().length;
    }

    getRecordsOfTrainingPlans() {
        console.log("getting all records of training plans");
        return myRealm.objects('RecordOfTrainingPlan');
    }

    getRecordOfTrainingPlan(id) {
        if(id === null) return;
        return myRealm.objectForPrimaryKey('RecordOfTrainingPlan', id);
    }

}

export const recordOfTrainingPlanService = RecordOfTrainingPlanService.getInstance();