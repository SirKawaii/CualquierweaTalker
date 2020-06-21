// utils.js
const fs = require('fs');
const path = require('path');
const http = require('http');
const { resolveTxt } = require('dns');

function GetToken() {

    let fileName  = 'secret.json'
    let filePath = path.join(__dirname, fileName);
    let secret = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return secret.discordApi;
}

function GetFacebookToken(){
    //not implemented
}


// json query option.
let options = {
    host: "cryptic-woodland-18269.herokuapp.com",
    port: 80,
    path: "/api/pokemons",
    method: 'GET'
};

function DoRequest(options, cb){
    http.request(options, function(res){
        let body = '';
        res.on('data', function(chunk){
            body+= chunk;
        });

        res.on('end', function(){
            let result = JSON.parse(body);
            cb(null, result);
        });
        res.on('error', cb);
    })
    .on('error', cb)
    .end();
}

function GetApiRequest(){
    let thing = null;

    DoRequest(options, function(err, result){
        if(err){
            return console.log("Error while trying to get the data ", err);
        }
        thing = result;
    });
    return thing;
}

function ListenChatStream(options, msg){

    http.get({
        agent: false,
        path: options.path,
        hostname: options.host
    }, (res) =>{
        res.on('data', data => {
            console.log(data.ToString());
        })
    });
}

module.exports = {
    GetToken,
    GetApiRequest,
    DoRequest,
    options
}
