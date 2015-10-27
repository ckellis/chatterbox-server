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

var client_local = "./client"
var server_local = "./server"




var requestHandler = function(req, resp) {

  console.log("Serving request type " + req.method + " for url " + req.url);
  
  if(req.method === "GET" && req.headers['datatype']==="JSON" && req.url === "/initial.json"){
    storage.lastTenMessages(function(e,d){
      if (e) {
        resp.writeHead(404); //only applys for file system errors. Fail mode.
        resp.end(JSON.stringify(e));
        return;
      }
      resp.writeHead(200,defaultCorsHeaders);
      resp.writeHead(Success_StatusCode,defaultCorsHeaders);
      return resp.end(JSON.stringify(d));
      
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

























  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.


  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "text/plain";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // resp.writeHead(statusCode, headers);

  // Make sure to always call resp.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // resp.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
 

  // These headers will allow Cross-Origin Resource Sharing (CORS).
  // This code allows this server to talk to websites that
  // are on different domains, for instance, your chat client.
  //
  // Your chat client is running from a url like file://your/chat/client/index.html,
  // which is considered a different domain.
  //
  // Another way to get around this restriction is to serve you chat
  // client from this domain by setting up static file serving.











