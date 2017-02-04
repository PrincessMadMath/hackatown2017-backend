var express = require('express')

const app = express()
const router = express.Router()

const routes = require('./Routes')

app.use('/', routes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})