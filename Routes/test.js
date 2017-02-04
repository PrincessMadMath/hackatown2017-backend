var express = require('express')
const router = express.Router()


router.get('/', function (req, res) {
  res.json({"message": "Hello World!"})
})

router.get('/public', function (req, res) {
  res.json({"public": process.env.TEST_PUBLIC})
})

router.get('/secret', function (req, res) {
  res.json({"secret": process.env.TEST_SECRET})
})


module.exports = router