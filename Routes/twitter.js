var express = require('express')
var twitter = require('twitter')  
var env = require('node-env-file');

const router = express.Router()

var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });


router.get('/signin', function (req, res) {
    res.json({"message": "Don't call this"})
})

router.get('/feedbyhashtag/:hashtag', function (req, res) {
    var query = '#' + req.params.hashtag;
    client.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
        if(!err){
            res.json(data);
        }
        else{
            res.json(err);
            throw err;
        }
    })
})

router.get('/monparc', function (req, res){
    var query = '#' + 'monparc';
    client.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
        if(!err){
            res.json(data);
        }
        else{
            res.json(err);
            throw err;
        }
    })
})

module.exports = router