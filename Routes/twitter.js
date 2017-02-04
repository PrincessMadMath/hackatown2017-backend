var express = require('express')
var twitter = require('twitter')

const router = express.Router()

var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });


router.get('/sigin', function (req, res) {
  res.json({"message": "Don't call this"})
})

router.get('/feedbyhashtag/:hashtag', function (req, res) {
    res.json(getTweetsByHashtag(req.params.hashtag))
})

router.get('/monparc'), function (req, res){
    res.json(getTweetsByHashtag('monparc'))
}

const getTweetsByHashtag = (hashtag) => {
    var query = '#' + hashtag;
    client.get('search/tweets', { q: query, count: 10 }, function(err, data, response) {
        if(!err){
            return data;
        }
        else{
            console.log(err);
            throw err;
        }
    })
}

module.exports = router