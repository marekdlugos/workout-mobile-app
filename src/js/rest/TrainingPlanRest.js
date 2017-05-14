/**
 * Created by railchamidullin on 11/05/2017.
 */
'use strict'

export const trainingPlanRest = {
    sendTrainingPlan() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
        })
            .then((response) => console.log(response.json()))
            .catch((error) => console.log(error))
    },

    getTrainingPlan() {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'userId': 11,
                'id': 101,
                'title': '"at nam consequatur ea labore ea harum"',
                'body': '"cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"',
            })
        })
            .then((response) => console.log(response.json()))
            .catch((error) => console.log(error))
    }
}

//export const trainingPlanRest = new TrainingPlanRest()

/*
 fetch('http://api.icndb.com/jokes/random', {
 method: 'GET',
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({
 firstParam: 'yourValue',
 secondParam: 'yourOtherValue',
 })


 */