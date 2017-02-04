var express = require('express')
const router = express.Router()


router.use('/test', require('./test'))
router.use('/facebook', require('./facebook'))
router.use('/twitter', require('./twitter'))


module.exports = router