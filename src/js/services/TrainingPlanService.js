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
}

export const trainingPlanService = TrainingPlanService.getInstance();