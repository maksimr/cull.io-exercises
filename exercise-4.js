/**
 * @desc Eval this.
 */

(function(global) {
    /**
     * @desc Create 'web service' that is capable of
     * responding to HTTP GET request.
     *
     * We will make requests to your web service
     * at location /eval.
     * We will send one parameter exp with a random
     * mathematical expression.
     *
     * Your web service should evaluate the
     * expression and print the result.
     *
     * For example:
     *  The request /eval?exp=2+2 should print 4
     */

    'use strict';

    var http = require('http'),
        url = require('url'),
        port = process.argv[2] || 3030;

    http.createServer(function(req, res) {
        var uri = url.parse(req.url, true),
            result;

        if (uri.pathname === '/eval' && uri.query.exp) {
            try {
                result = eval('(' + uri.query.exp + ')');
            } catch (e) {
                result = e;
            }

            res.write(String(result));
        }

        res.end();
    }).listen(port);

}(this));
