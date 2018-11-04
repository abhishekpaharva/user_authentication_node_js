const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

var server = http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	if(req.url == "/" )
	{
		fs.readFile(__dirname + '/PUBLIC/index.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
		    res.write(data);
		    res.end();
		});
	}
	else if(req.url == "/index.html")
	{
		if(req.method == "POST")
		{
			var data = "";
		    req.on("data", function(form_data){
		        data += form_data;
		    });

		    req.on("end", function(form_data){
		        var query_data = querystring.parse(data);

			    if(query_data.usr == "abhishek" && query_data.pwd == "abhi123")
			    {
			    	console.log("login successful");
					fs.readFile(__dirname + '/PUBLIC/success.html', function(err, data) {
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write(data);
						res.end();
					});
				}
				else{
					res.writeHead(200, {'Content-Type': 'text/html'});
				    res.write("<script>alert('invalid username ansd password')</script>");
				    res.end();
				}
			});
		}
		else{
			fs.readFile(__dirname + '/PUBLIC/index.html', function(err, data) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			});
		}
	}
	else{
		res.writeHead(404);
		res.end();
	}
});

server.listen(8080);