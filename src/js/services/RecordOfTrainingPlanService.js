/**
 * Created by railchamidullin on 27/04/2017.
 */
'use strict';

import {myRealm} from '../config/Config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class RecordOfTrainingPlanService {

    constructor(enforcer) {
        if(enforcer != singletonEnforcer) throw "Cannot construct TrainingPlanService singleton";
    }

    static getInstance() {
        if(!this[singleton]) {
            this[singleton] = new RecordOfTrainingPlanService(singletonEnforcer);
        }
        return this[singleton];
    }

    createRecordOfExercise(exercise) {
        return {
            exerciseName: exercise.name,
            weight: exercise.weight,
            noOfSets: exercise.noOfSets,
            noOfRepetitions: exercise.noOfRepetitions,
            completed: false,
        };
    }

    setEndTimeOfRecordOfTrainingPlan(recordOfTrainingPlan, endOfTraining) {
        myRealm.write(() => recordOfTrainingPlan.endOfTraining = endOfTraining);
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
        let result = this.getRecordsOfTrainingPlans();
        return result.length;
    }

    getRecordsOfTrainingPlans() {
        console.log("getting all records of training plans");
        return myRealm.objects('RecordOfTrainingPlan');
    }

    getRecordOfTrainingPlan(id) {
        return myRealm.objectForPrimaryKey('RecordOfTrainingPlan', id);
    }

}

export const recordOfTrainingPlanService = RecordOfTrainingPlanService.getInstance();