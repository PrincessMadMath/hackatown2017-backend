var express = require('express')
var twitter = require('twitter')  
var fs = require('fs');

if(!process.env.IS_AWS)
{
    var env = require('node-env-file');
    env(__dirname + '/../.env');
}

var sentiments = JSON.parse(fs.readFileSync(__dirname + '/../Data/sentiments.json', 'utf8'));

const router = express.Router()


// var client = new twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//     });

// fuck it
var client = new twitter({
    consumer_key: 'DRk2XjcGctp074ywMovfOKeEi',
    consumer_secret: 'wvbftqLimErtc622XYxldsXfoc0djy3nUV0RE0naSJCQ2Mlwgi',
    access_token_key: '2582787825-DBxonUfxzyqKF9SAETqFeLh25eCUW4foa4CwCsw',
    access_token_secret: 'Uln4JVbEEdcwGBCEVn0rtSpotRkG6w2BAvDMSUOsvXqJk'
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
        }
    })
})

router.get('/feedbyusername/:username', function (req, res) {
    var query = 'from:' + req.params.username;
    client.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
        if(!err){
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})

router.get('/feedbycontent/:content', function (req, res) {
    var query = req.params.content;
    client.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
        if(!err){
            res.json(data);
        }
        else{
            res.json(err);
        }
    })
})

router.get('/geolocal', function (req, res) {
    var geocode = req.query.lat + ',' + req.query.lon + ',' + req.query.radius 
    client.get('search/tweets', {geocode: geocode, count: 10 }, function(err, data, response) {
        if(!err){
            res.json(data);
        }
        else{
            res.json(err);
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
        }
    })
})

router.get('/positiveparcs', function(req, res){
    var parcs = req.body.parcs
    var since = req.body.date 

    var validParcs = []
    for (var i = 0, len = parcs.length; i < len; i++) {
        var parcName = parcs[i]
        var query = ''

        for (var i = 0, len = sentiments.good.length; i < len; i++) {
          query = query + parcName + ' ' + sentiments.good[j]
          if(i+1 < len){
            query = query + ' OR '
          }
        }
        
        client.get('search/tweets', { q: query, count: 2 }, function(err, data, response) {
            if(!err){
                var validTimeTweets = data.statuses.filter(filterTime(since))
                if (typeof validTimeTweets !== 'undefined' && validTimeTweets.length > 0) {
                    validParcs.push(query)
                }   

            }
            else{
                res.json(err);
            }
        })
    }
    res.json(validParcs);
})

router.post('/negativeparcs', function(req, res){
    var parcs = req.body.parcs
    var since = req.body.date 

    var validParcs = []
    for (var i = 0, len = parcs.length; i < len; i++) {
        var parcName = parcs[i]
        var query = ''

        for (var i = 0, len = sentiments.bad.length; i < len; i++) {
          query = query + parcName + ' ' + sentiments.bad[j]
          if(i+1 < len){
            query = query + ' OR '
          }
        }

        client.get('search/tweets', { q: query, count: 2 }, function(err, data, response) {
            if(!err){
                var validTimeTweets = data.statuses.filter(filterTime(since))
                if (typeof validTimeTweets !== 'undefined' && validTimeTweets.length > 0) {
                    validParcs.push(query)
                }   

            }
            else{
                res.json(err);
            }
        })
    }
    res.json(validParcs);
    
})

var filterTime = (date) => {
    return function(tweet){
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        var dateTweet = new Date(tweet.created_at).getTime();
        if (Math.floor((dateTweet - date) / _MS_PER_DAY) < 300000) {
            return true;
        }
        return false;
    }
}

module.exports = router