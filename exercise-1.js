/**
 * Cull.io
 *
 * exercise 'Hello World'.
 */

(function(global) {
    /**
     * @desc Create service that prints
     * 'world' when a request is made at
     * location /hello.
     */
    var http = require('http'),
        port = process.argv[2] || 3030;

    http.createServer(function(req, res) {

        if (req.url === '/hello') {
            res.write('World');
            res.end();
            return;
        }

        res.end();
    }).listen(port);

}(this));
