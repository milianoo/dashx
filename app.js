(function() {
    var bodyParser = require('body-parser'),
        express = require('express'),
        querystring = require('querystring'),
        http = require('https'),
        app = express();
        app.use(express.static(__dirname + '/src'));

        var server = app.listen(process.env.PORT || 5000, function () {
            var port = server.address().port;
            console.log("dashx started at port %s", port);
        });
})();