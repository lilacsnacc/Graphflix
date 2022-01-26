const http = require('http')

class RestAPI {
  server;
  sockets = [];

  /**
   * @param {string} jsonPath is the relative api path (relative to this fie). We could do absolute pathing, but I would need more time / research
   * @param {string} targetEndpoint is the path you want to serve the endpoint from
   * @param {number} port is the port the server will run on. 0 by default, which just means 'hey Node, pick an open port for me'
   */
  constructor(jsonPath, targetEndpoint, port = 0) {
    // If any of the parameters are not the correct type, throw error.
    if (isNaN(port) || [jsonPath, targetEndpoint].some(param => !(typeof param === 'string')))
      throw new TypeError('RestAPI parameters were not of the correct type'); // We can get more specific to each parameter here

    // Now create the server object, and give it the Rest functionality:
    this.server = http.createServer(async (req, res) => {
      let responseBody = '"Route Undefined"'; // The default response body.
      let statusCode = req.url === targetEndpoint && req.method === 'GET' ? 200 : 404; // If the request is not for the specified url, it's a 404

      // If the statusCode looks good so far, fetch the data..
      statusCode === 200 && await new Promise(resolve => resolve(require(jsonPath)))
        .then(value => responseBody = JSON.stringify(value)) // success! set the response body to the fetched data
        .catch(err => { // failure! set the appropriate statuscode, and response body to the err
          statusCode = 500
          responseBody = JSON.stringify(err) //if there is an error message, print that. otherwise, just print the error
        })

      // finally, let's respond to the request given the statusCode and responseBody
      res.writeHead(statusCode, { 'Content-Type': 'application/json' }).end(responseBody)
    });

    this.server.on('connection', socket => this.sockets.push(socket));

    // Listen on the specified port and then print a quick link to the port
    // Here we could say an official ip address / domain instead of just localhost, or specify the domain in the ENV or class params
    this.server.listen(port,
      () => console.log(`Serving RestAPI on http://localhost:${this.server.address().port}${targetEndpoint}`))
  }

  /** Terminates all connections and closes the server */
  close() {
    while(this.sockets.length)
      this.sockets.pop().destroy()

    this.server.close()
  }
}

module.exports = RestAPI