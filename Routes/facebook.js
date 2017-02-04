var express = require('express')
const router = express.Router()
var graph = require('fbgraph')

var config = require('../Config/facebook.js')

console.log(config.client_token)
graph.setAccessToken(config.client_token)

test = () => {
    graph.get("/ParcJeanDrapeau/events", function(err, res) {
        console.log(res);
    })
}

router.get('/', function (req, res) {
  test()
  res.json({"message": "Test!"})
})

module.exports = router