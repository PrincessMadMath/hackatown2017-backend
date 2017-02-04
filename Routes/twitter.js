var express = require('express')
var twitter = require('twitter')  
var fs = require('fs');

if(!process.env.IS_AWS)
{
    var env = require('node-env-file');
    env(__dirname + '/../.env');
}

var parcs = JSON.parse(fs.readFileSync(__dirname + '/../Data/parcs.json', 'utf8')).parcs;
var sentiments = JSON.parse(fs.readFileSync(__dirname + '/../Data/sentiments.json', 'utf8'));

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

router.get('/positiveparcs', function(req, res){
    var query = ''
    for (var i = 0, lenp = parcs.length; i < lenp; i++) {
        for (var j = 0, len = sentiments.good.length; j < len; j++) {
          query = query + parcs[i] + ' ' + sentiments.good[j]
          if(i+1 < lenp){
            query = query + ' OR '
          }
        }
    }   

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

router.get('/negativeparcs', function(req, res){
    var query = ''
    for (var i = 0, lenp = parcs.length; i < lenp; i++) {
        for (var j = 0, len = sentiments.bad.length; j < len; j++) {
          query = query + parcs[i] + ' ' + sentiments.bad[j]
          if(i+1 < lenp){
            query = query + ' OR '
          }
        }
    }   

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