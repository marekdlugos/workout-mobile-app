/**
 * Created by railchamidullin on 31/03/2017.
 */
'use strict';

import Realm from 'realm';

const ExerciseSchema = {
    name: 'Exercise',
    properties: {
        name: 'string',
        weight: 'int',
        noOfSets: 'int',
        noOfRepetitions: 'int'
    }
};

const TrainingPlanSchema = {
    name: 'TrainingPlan',
    properties: {
        name: 'string',
        exercises: {type: 'list', objectType: 'Exercise'}
    }
};

const SettingsSchema = {
    name: 'Settings',
    properties: {
        units: 'string',
        weightIncreasing: 'bool'
    }
};

export const myRealm = new Realm({schema: [ExerciseSchema, TrainingPlanSchema, SettingsSchema]});

