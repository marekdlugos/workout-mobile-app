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

export class MyRealm {

    static instance;

    constructor(){
        if(MyRealm.instance){
            return MyRealm.instance;
        }

        MyRealm.instance = new Realm({schema: [ExerciseSchema, TrainingPlanSchema]});


    }

    static getInstance() {
        if(!MyRealm.instance) {
            new MyRealm();
        }

        return MyRealm.instance;
    }

}



