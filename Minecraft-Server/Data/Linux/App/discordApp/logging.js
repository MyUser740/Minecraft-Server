const fs = require('fs');

exports.Debug = (messages) => {

	var msgs = '>[' + new Date().toString() + '][DEBUG] ' + messages + '\n';

	fs.appendFile('../../../../LogOutput/Discord.log', msgs, err => { if (err) { throw err; } });
}

exports.Info = (messages) => {

	var msgs = '>[' + new Date().toString() + '][Info] ' + messages + '\n';

	fs.appendFile('../../../../LogOutput/Discord.log', msgs, err => { if (err) { throw err; } });
}

exports.Warn = (messages) => {

	var msgs = '>[' + new Date().toString() + '][WARN] ' + messages + '\n';

	fs.appendFile('../../../../LogOutput/Discord.log', msgs, err => { if (err) { throw err; } });
}

exports.Error = (messages) => {

	var msgs = '>[' + new Date().toString() + '][ERROR] ' + messages + '\n';

	fs.appendFile('../../../../LogOutput/Discord.log', msgs, err => { if (err) { throw err; } });
}

exports.Fatal = (messages) => {

	var msgs = '>[' + new Date().toString() + '][Fatal] ' + messages + '\n';

	fs.appendFile('../../../../LogOutput/Discord.log', msgs, err => { if (err) { throw err; } });
}