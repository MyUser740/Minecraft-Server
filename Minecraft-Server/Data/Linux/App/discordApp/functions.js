const mysql = require('mysql')
const config = require('./config.json');

exports.parseCommand = (data, parseArg) => {
	const parsed = {};
	const dataParsed = data.split(' ');
	parsed.prefix = dataParsed[0][0];
	parsed.command = dataParsed[0].slice(1);
	parseArg
		? (parsed.arg = dataParsed.slice(1))
		: (parsed.arg = dataParsed.slice(1).join(' '));
	return parsed;
}

exports.con = mysql.createConnection({
	host: config.mysql_host,
	user: config.mysql_username,
	password: config.mysql_password,
	database: config.mysql_databases[0]
});