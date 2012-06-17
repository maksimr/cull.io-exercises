/**
 * Cull.io
 * exercise 'Nth decimal digit of Pi.'
 */

(function(global) {
    /**
     * @desc We make request and location /pi with
     * parameter 'n'. Webservice is expected
     * to print the nth decimal digit of pi.
     *
     * For request /pi?n=1 should return "1",
     * /pi?n=4 should print "5".
     */
    var http = require('http'),
        url = require('url'),
        dd = String(Math.PI),
        port = process.argv[2] || 3030;

    dd = dd.slice(1).split('');

    http.createServer(function(req, res) {
        var query = url.parse(req.url, true).query,
            n, i;

        // handle only correct url
        if (/^\/pi\?n=\d+/.test(req.url)) {
            n = +query.n;

            for (i = n; i < dd.length; i++) {
                if (dd[n] % 2) {
                    res.write(dd[n]);
                    break;
                }
            }

            res.end();
            return;
        }

        res.end();
    }).listen(port);

}(this));
