/**
 * @desc Print the tweet given it's id.
 */

(function(global) {
    /**
     * @desc Create a web service
     * that is capable of responding to
     * HTTP GET request.
     *
     * We will make requests to your web service
     * at location /tweet.
     * We will send you two parameters 'userid' and 'tweetid'.
     *
     * Your web service should retriev that tweet
     * corresponding to the given tweetid and userid
     * and print it.
     */
    var http = require('http'),
        url = require('url'),
        slice = Array.prototype.slice,

        twitter = {
            host: 'api.twitter.com',
            port: 80
        },

        currying = function(fn) {
            var params = slice.call(arguments, 1);
            return function() {
                fn.apply(global, params.concat(slice.call(arguments, 0)));
            };
        };

    var getTweet, onGetTweet, onError;

    http.createServer(function(req, res) {
        if (url.parse(req.url).pathname === '/tweet') {
            getTweet(req, res);
            return;
        }

        res.end();
    }).listen(3030);

    /**
     * @param {Object} req The request.
     * @param {Object} res The server response.
     */
    getTweet = function(req, res) {
        var query = url.parse(req.url, true).query,
            path;

        if (query.userid && query.tweetid) {
            path = '/1/statuses/show/' + query.tweetid + '.json';

            http.get({
                host: twitter.host,
                port: twitter.port,
                path: path
            }, currying(onGetTweet, res)).on('error', currying(onError, res));

            return;
        }

        res.end();
    };

    /**
     * @param {Object} res The server response.
     * @param {Object} tresp The response of twitter server.
     */
    onGetTweet = function(res, tresp) {
        var tweet = '';

        tresp.on('data', function(chunk) {
            tweet += chunk;
        });

        tresp.on('end', function() {
            tweet = JSON.parse(tweet);

            if (!tweet.errors) {
                res.write(String(tweet.text));
            }

            res.end();
        });
    };

    /**
     * @param {Object} res The server response.
     * @param {Object} err The error unsuccess request to twitter.
     */
    onError = function(res, err) {
        res.end();
    };

}(this));
