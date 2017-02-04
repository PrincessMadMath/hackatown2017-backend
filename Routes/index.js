var express = require('express')
const router = express.Router()


router.use('/test', require('./test'))
router.use('/facebook', require('./facebook'))


module.exports = router