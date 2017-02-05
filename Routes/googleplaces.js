var express = require('express')
var GooglePlaces = require('node-googleplaces')

if(!process.env.IS_AWS)
{
    var env = require('node-env-file');
    env(__dirname + '/../.env');
}

const router = express.Router()