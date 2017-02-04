var express = require('express')
const router = express.Router()


router.use('/test', require('./test'))
router.use('/twitter', require('./twitter'))


module.exports = router