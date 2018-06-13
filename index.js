var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
	// TODO: Add links to index.html so users can navigate
	res.sendFile(__dirname + '/static/html/index.html');
});

app.get('/form', function(req, res) {
	res.sendFile(__dirname + '/static/html/form.html');
});

app.post('/skills/new', function(req, res){
	var skill = req.body.skill;
	var level = req.body.level;
	var skillsArr = fs.readFileSync('./data.json');
	skillsArr = JSON.parse(skillsArr);
	skillsArr.push({'name': skill, 'level': level});
	skillsArr = JSON.stringify(skillsArr);
	fs.writeFileSync('./data.json', skillsArr);
	res.redirect('/skills');
});

app.get('/skills', function(req, res) {
	var skills = fs.readFileSync('./data.json');
	skills = JSON.parse(skills); // turns into object
	// TODO: Render this array of skills into an EJS template
	res.render('skills', {skills: skills});
});

// TODO: Add GET route that returns static page containing a form

// TODO: Add POST route that writes new skill to the file, redirects to skills index
// TODO: Form should have action='/skills' and method='POST'

app.listen(process.env.PORT || 3000);