/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');
var url = require('url');
var storage = require('./storage.js');
storage.initialize();

var Success_StatusCode = 200; //Shouldnt be set staticly..
var defaultCorsHeaders = {
  'Access-Control-Allow-Origin': "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type':"text/html"
};

var defaultJSONHeaders = {
  'Access-Control-Allow-Origin': "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "*",
  // "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type':"application/json" // Seconds.
};

// See the note below about CORS headers.
var headers = defaultCorsHeaders;

// headers['Content-Type'] = "application/json";

var client_local = "./client";
var server_local = "./server";




var requestHandler = function(req, resp) {

  console.log("Serving request type " + req.method + " for url " + req.url);
  
  if(req.method === "GET" && req.headers['datatype']==="JSON" && req.url === "/initial.json"){
    storage.lastTenMessages(function(e,d){
      if (e) {
        resp.writeHead(404); //only applys for file system errors. Fail mode.
        resp.end(JSON.stringify(e));
        return;
      }else{

        resp.writeHead(200,defaultCorsHeaders);
        resp.writeHead(Success_StatusCode,defaultCorsHeaders);
        return resp.end(JSON.stringify(d));
        
      }
    });
    return;
  }

  if(req.method === "POST" && req.url === '/signin'){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      var userCreds = JSON.parse(body);
      var storageResp = storage.login(userCreds);
      // var storageResp = storage.login(userCreds.username,userCreds.password);
      if(storageResp.type === "success"){
        resp.writeHead(200);
        resp.end(JSON.stringify(storageResp));
      }else{
        resp.writeHead(400);
        resp.end(JSON.stringify(storageResp));
      }
    });
    return;
  }

  if(req.method === "POST" && req.url === '/signup'){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      var userCreds = JSON.parse(body);

      var storageResp = storage.newUser(userCreds);

      if(storageResp.type === "success"){
        resp.writeHead(200);
        resp.end(JSON.stringify(storageResp));
      }else{
        resp.writeHead(400);
        resp.end(JSON.stringify(storageResp));
      }
    });
    return;
  }

  if(req.method === "POST" && req.url === '/signout'){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      var userObj = JSON.parse(body);
      var storageResp = storage.logout(userObj);

      console.log("LOGOUT RESP : ",storageResp)

      if(storageResp.type === "success"){
        resp.writeHead(200);
        resp.end(JSON.stringify(storageResp));
      }else{
        resp.writeHead(400);
        resp.end(JSON.stringify(storageResp));
      }
    });
    return;
  }
  if(req.method === "POST"){
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });

    req.on('end', function() {
      newMessage = JSON.parse(body);
      storage.newMessage(newMessage); 
      resp.writeHead(200);
      resp.end(JSON.stringify(newMessage));
    });
    return;
  }

  if(req.method === "GET"){
    console.log(client_local + req.url)

    fs.readFile(client_local + req.url, function (err,data) {
      
      if (err) {
        resp.writeHead(404); //only applys for file system errors. Fail mode.
        resp.end(JSON.stringify(err));
        return;
      }

      resp.writeHead(200,headers);
      resp.writeHead(Success_StatusCode,headers);

      resp.end(data);
    });
    return;
  }

};





//===================================================MODULE BUSINESS=========== DONT MESS WITH ME.
module.exports = {
  requestHandler: requestHandler,
}







