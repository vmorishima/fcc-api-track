var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

app.use(express.static(__dirname + '/views'));

var router = express.Router();

// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });


router.route('/:date')
    .get(function(req, res) {
        var rawDate = req.params.date;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (!Number.isNaN(Number(rawDate))) {
          rawDate = Number(rawDate) * 1000;
        }
        
        var formattedDate = null;
        var unixDate = null;
        var date = new Date(rawDate);
        if (!Number.isNaN(date.getDate())) {
        var day = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        formattedDate = month + ' ' + day + ', ' + year;
        unixDate = date.getTime() / 1000;
        }
        
        res.json({unix: unixDate, natural: formattedDate});
        
    });


app.use('/api', router);

app.get('/', function (req, res) {
 res.sendFile('index.html', { root: __dirname + '/views' });
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})