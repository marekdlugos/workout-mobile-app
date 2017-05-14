/**
 * Created by railchamidullin on 28/04/2017.
 */
'use strict';

import {myRealm} from '../config/Config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class CurrentStateService {

    constructor(enforcer) {
        if(enforcer != singletonEnforcer) throw "Cannot construct TrainingPlanService singleton";
    }

    static getInstance() {
        if(!this[singleton]) {
            this[singleton] = new CurrentStateService(singletonEnforcer);
        }
        return this[singleton];
    }

    getActualStateObject() {
        let actualStateObject = myRealm.objects('ActualState');
        if (actualStateObject.length == 0) {
            myRealm.write(() => myRealm.create('ActualState', {
                currentTrainingPlanName: null,
                currentRecordOfTrainingPlanId: null,
            }));
        } else if (actualStateObject.length != 1) console.log("Error there is more actualState objects");

        return actualStateObject[0];
    }

    setCurrentTrainingPlan(trainingPlan, recordOfTrainingPlan) {
        myRealm.write(() => this.getActualStateObject().currentTrainingPlanName = trainingPlan.name);
        myRealm.write(() => this.getActualStateObject().currentRecordOfTrainingPlanId = recordOfTrainingPlan.id);
    }

    removeCurrentTrainingPlanState() {
        myRealm.write(() => this.getActualStateObject().currentTrainingPlanName = null);
        myRealm.write(() => this.getActualStateObject().currentRecordOfTrainingPlanId = null);
    }

    getCurrentTrainingPlanName() {
        return this.getActualStateObject().currentTrainingPlanName;
    }

    getCurrentRecordOfTrainingPlanId() {
        return this.getActualStateObject().currentRecordOfTrainingPlanId;
    }

}

export const currentStateService = CurrentStateService.getInstance();