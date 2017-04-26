/**
 * Created by railchamidullin on 26/04/2017.
 */

import {myRealm} from '../config/Config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class SettingsService {

    constructor(enforcer) {
        if (enforcer != singletonEnforcer) throw "Cannot construct TrainingPlanService singleton";
    }

    static getInstance() {
        if (!this[singleton]) {
            this[singleton] = new SettingsService(singletonEnforcer);
        }
        return this[singleton];
    }

    getSettingsObject() {
        let settingsObject = myRealm.objects('Settings');
        if (settingsObject.length == 0) {
            myRealm.write(() => myRealm.create('Settings', {
                units: 'Kilograms',
                weightIncreasing: true,
            }));
        } else if (settingsObject.length != 1) console.log("Error there is more settings objects");

        return settingsObject[0];
    }

    setUnits(unit) {
        myRealm.write(() => this.getSettingsObject().units = unit);
    }

    getUnits() {
        return this.getSettingsObject().units;
    }

    setWeightIncreasing(bool) {
        myRealm.write(() => this.getSettingsObject().weightIncreasing = bool);
    }

    getWeightIncreasing() {
        return this.getSettingsObject().weightIncreasing;
    }

}

export const settingsService = SettingsService.getInstance();