//
//  RecordOfTrainingPlan.swift
//  workout-app
//
//  Created by Rail Chamidullin on 15/03/2017.
//  Copyright © 2017 Rail Chamidullin. All rights reserved.
//

import Foundation

class RecordOfTrainingPlan: Object {
    dynamic var name: String = ""
    dynamic var startTime:Date?
    dynamic var endTime:Date?
    
    let exercises = List<RecordOfExercise>()
}

class RecordOfExercise: Object {
    dynamic var name:String = ""
}

class RecordOfWeightLifting: RecordOfExercise {
    dynamic var weight = 0
    dynamic var noOfSets = 0
    dynamic var noOfRepetitions = 0
}
