var express = require('express');  
var request = require('request');
var http = require('http');

var data = "";

var app = express();  
app.use('/', function(req, res) {
	var hostURL = "http://ngd8j7ag8i3kvv.devcloud.acquia-sites.com";
	var url = hostURL + req.url;
	console.log("here");
	console.log(url);
	req.pipe(request(url, function (error, newRes, body) {
	  console.log(newRes);
	  // body is the decompressed response body
	  //console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
	  //console.log('the decoded data is: ' + body)
	  var headers = newRes.headers;
	  var temp;
	  
	  newRes.headers["Access-Control-Allow-Origin"]="*";
	  newRes.headers["Access-Control-Allow-Headers"]="Origin, X-Requested-With, Content-Type, Accept";
	  res.writeHead(newRes.statusCode, headers);
	  
	  temp = body.replace(/src=\\\"\\\//gi, 'src=\\"'+ hostURL + '\/');
	  res.write(temp);
	  res.end();
	}));
    
	
});

app.listen(process.env.PORT || 3320); 

