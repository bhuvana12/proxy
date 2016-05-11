var express = require('express');  
var http = require('http');
var app = express();  

var argv = require('yargs')
    .usage('$0 <cmd> [args]')
    .option('host', {
      alias: 'h',
      describe: 'Hostname of external Server example.com',
      demand: true,
      demand: 'Hostname is required. See --help for usage'
    })
    .option('port',{
      alias: 'p',
      describe: 'Port to listen to',
      default: 3320
    })
    .help('help')
    .argv;

app.use('/', function(req, res) {
	var hostURL = "http://" + argv.host;
	var url = hostURL + req.url;
    //req.pipe(request(url)).pipe(res);
	
	var newReq = http.request(url, function(newRes) {
		var data = "";
		var setData = function(d){data = d;}
		var getData = function(){return data;}
		
		newRes.on("data", function(chunk) {
			var body = getData();
			setData (body + chunk);
		});

		
		newRes.on("end",function(){
			
			/* Find and replace stuff!*/
			/* We are trying to replace this string -- src=\"\/ -- with the domain appended */
			var temp;
			temp = getData().replace(/src=\\\"\\\//gi, 'src=\\"'+ hostURL + '\/');
			
			var headers = newRes.headers;
			newRes.headers['Transfer-Encoding'] = 'chunked';
			newRes.headers["Access-Control-Allow-Origin"]="*";
			newRes.headers["Access-Control-Allow-Headers"]="Origin, X-Requested-With, Content-Type, Accept";
			
			res.writeHead(newRes.statusCode, headers);
			res.write(temp);
			res.end();
		});
		
	  }).on('error', function(err) {
		res.statusCode = 500;
		console.log("error");
		res.end();
	  });

	req.pipe(newReq);
	
	
	
});

app.listen(process.env.PORT || argv.port); 
