// utils.js
const fs = require('fs');
const path = require('path');
const http = require('http');
const { resolveTxt } = require('dns');

function GetToken() {

    let filePath = path.join('.','utils','secret.JSON');
    console.log("current path : " + filePath);

    fs.readFile(filePath, (err, jsonString) => {
        if(err){
            console.log("Error reading file from disk", err);
            return;
        }
        try{
            let secretFile = JSON.parse(jsonString);
            return secretFile.discordApi;
        }
        catch (err){
            console.log("Error parsing Json string:", err);
            return
        }
    });
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
