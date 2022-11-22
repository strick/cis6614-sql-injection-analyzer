var http = require('http');
    
function serverRequests(request, response){
    response.end("Hello there");
}
http.createServer(serverRequests).listen(3007);
