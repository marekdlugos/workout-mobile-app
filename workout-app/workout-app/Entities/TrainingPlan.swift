//
//  TrainingPlan.swift
//  workout-app
//
//  Created by Rail Chamidullin on 15/03/2017.
//  Copyright © 2017 Rail Chamidullin. All rights reserved.
//

import Foundation
import RealmSwift

class TrainingPlan: Object {
    dynamic var name: String = ""
    var repetition:Repetition = .none
    dynamic var daysOfWeek:DaysOfWeek?
    
    let exercises = List<Exercise>()
    let historicPlans = List<RecordOfTrainingPlan>()
    
}

class Exercise: Object {
    dynamic var name:String = ""
    let historicExercises = List<RecordOfTrainingPlan>()
    
}

class WeightLifting: Exercise {
    dynamic var weight = 0
    dynamic var noOfSets = 0
    dynamic var noOfRepetitions = 0
}

class DaysOfWeek: Object {
    dynamic var monday = false
    dynamic var tuesday = false
    dynamic var wednesday = false
    dynamic var thursday = false
    dynamic var friday = false
    dynamic var saturday = false
    dynamic var sunday = false
}

enum Repetition {
    case none
    case weekly
    case monthly
}
