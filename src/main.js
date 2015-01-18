var fs = require('fs');
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
	string: ['config'],
	alias: {
		'config': ['c'],
		'port': ['p']
	},
	default: {
		port: 8091
	},
});

if(!argv.config) {
	throw new Error(
		'Incorrect parameters\n' +
		'Usage: ' + process.argv.slice(0,2).join(' ') + ' --config [PATH_TO_CONFIG]\n' +
		'\n' +
		'See ./examples/example-config.json for help.'
	);
}

var config = JSON.parse(fs.readFileSync(argv.config));

var app = express();
app.use(morgan('combined'));
app.use(cors());

app.use(function errorHandler(err, req, res, next) {
	if(!err) {
		next(err);
	}

	console.error(err);

	res.status(500);
	res.json({
		error: app.env === 'development' ? err.message : 'Internal Server Error'
	});
});

app.use('/:user', require('./routers/user')(config));

var server = app.listen(argv.port, function onServerListening() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('github-filter-proxy listening at http://%s:%s', host, port);
});