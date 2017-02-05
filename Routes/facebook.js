var express = require('express')
const router = express.Router()

const promise = require('bluebird')
var graph = promise.promisifyAll(require('fbgraph'))

const fakeData = require('../Data/events.json')

var config = require('../Config/facebook.js')

graph.setAccessToken(config.client_token)

router.get('/', function (req, res) {
    res.json({"Message": "Welcome to facebook route!"})
})

router.get('/eventsFrom/:name', function (req, res) {
    var eventName = req.params.name;
    graph
        .getAsync("/" + eventName + "/events")
        .then((data) => {
            // Add clean up events
            res.json(data.data.map(extract))
        })
        .catch((ex) => {
            var randomEvents = [
                fakeData[Math.ceil((Math.random() * fakeData.length - 1))],
                fakeData[Math.ceil((Math.random() * fakeData.length - 1))],
                fakeData[Math.ceil((Math.random() * fakeData.length - 1))]
            ]
            res.json(randomEvents);
        })
})

extract = (event) => {
    return {name: event.name, description: event.description, start_time: event.start_time, end_time: event.end_time, id: event.id}
}

module.exports = router