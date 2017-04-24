/**
 * Created by railchamidullin on 01/04/2017.
 */

import {MyRealm} from '../config/Config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

const myRealm = MyRealm.getInstance();

export class TrainingPlanService {

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

        /*
         re.write(() => {
         let trainingPlanA = re.create('TrainingPlanService', {
         name: "Training Plan D",
         exercises: [{
         name: 'Bench',
         weight: 60,
         noOfSets: 4,
         noOfRepetitions: 10,
         }],
         });
         });*/

        //let latestObject = .objects('TrainingPlanService')[realm.objects('TrainingPlanService').length -1];
        //console.log(latestObject.exercises[0]);
    }

    /*
    createExercise(exercise) {
        return myRealm.create('Exercise', {
            name: exercise.name,
            weight: exercise.weight,
            noOfSets: exercise.noOfSets,
            noOfRepetitions: exercise.noOfRepetitions,
        });
    }

    saveExercise(exercise) {
        myRealm.write(() => {this.createExercise(exercise)});
    }*/

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
        return MyRealm.getInstance().objects('TrainingPlan');
    }
}
