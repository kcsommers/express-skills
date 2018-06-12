var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/static/html/index.html');
});

app.get('/skills', function(req, res) {
	var skills = fs.readFileSync('data.json');
	skills = JSON.parse(skills); // turns into object
	res.send(skills);
});


app.listen(process.env.PORT || 3000);