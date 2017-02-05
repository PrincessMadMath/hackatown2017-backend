"use strict" 
 
let config 
 
if(process.env.IS_AWS) 
{ 
    config = { 
        client_id: process.env.FB_PUBLIC_ID, 
        client_secret: process.env.FB_PRIVATE_ID,
        client_token: process.env.FACEBOOK_CLIENT_TOKEN
    } 
} 
else{ 
    config = require('./facebook_local.json') 
} 
 
module.exports = config