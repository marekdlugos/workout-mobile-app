/**
 * Created by railchamidullin on 31/03/2017.
 */
'use strict';

import Realm from 'realm';

const TrainingPlanSchema = {
    name: 'TrainingPlan',
    primaryKey: 'name',
    properties: {
        name: 'string',
        exercises: {type: 'list', objectType: 'Exercise'}
    }
};

const ExerciseSchema = {
    name: 'Exercise',
    primaryKey: 'name',
    properties: {
        name: 'string',
        weight: 'int',
        noOfSets: 'int',
        noOfRepetitions: 'int'
    }
};

const RecordOfTrainingPlanSchema = {
    name: 'RecordOfTrainingPlan',
    primaryKey: 'id',
    properties: {
        id: 'int',
        trainingPlanName: 'string',
        startOfTraining: 'date',
        endOfTraining: {type: 'date', optional: true},
        exercises: {type: 'list', objectType: 'RecordOfExercise'}
    }
};

const RecordOfExerciseSchema = {
    name: 'RecordOfExercise',
    properties: {
        exerciseName: 'string',
        weight: 'int',
        noOfSets: 'int',
        noOfRepetitions: 'int',
        completed: {type: 'bool', optional: true},
    }
};

const SettingsSchema = {
    name: 'Settings',
    properties: {
        units: 'string',
        weightIncreasing: 'bool',
        nameOfUser: 'string',
    }
};

const ActualStateSchema = {
    name: 'ActualState',
    properties: {
        currentTrainingPlanName: {type: 'string', optional: true},
        currentRecordOfTrainingPlanId: {type: 'int', optional: true},

    }
};

/*
 currentTrainingPlanName: {type: 'string', optional: true},
 currentRecordOfTrainingPlan: {type: 'int', optional: true}
 */


export const myRealm = new Realm({schema: [ExerciseSchema, TrainingPlanSchema, SettingsSchema, RecordOfTrainingPlanSchema, RecordOfExerciseSchema, ActualStateSchema]});