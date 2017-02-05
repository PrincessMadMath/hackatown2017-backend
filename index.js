var express = require('express')
var bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router()

const routes = require('./Routes')

var allowedUrls = ['http://localhost:8000', 'https://mon-parc.netlify.com', 'http://mon-parc.netlify.com']


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    var origin = req.headers.origin;
    if(allowedUrls.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    next();
}




app.use(allowCrossDomain);
app.use('/', routes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})