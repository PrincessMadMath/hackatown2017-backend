var express = require('express')

const app = express()
const router = express.Router()

const routes = require('./Routes')


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    next();
}


app.use(allowCrossDomain);
app.use('/', routes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})