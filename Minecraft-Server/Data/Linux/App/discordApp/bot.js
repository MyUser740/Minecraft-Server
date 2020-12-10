//headers
const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql');
require('dotenv').config;

//bot token
client.login(process.env.BOT_TOKEN);

//variables
var botPrefix = '/';
var confirmHandler = false;
var yesNoType;

//functions
function parseCommand(data, parseArg) {
	const parsed = {};
	const dataParsed = data.split(' ');
	parsed.prefix = dataParsed[0][0];
	parsed.command = dataParsed[0].slice(1);
	parseArg
		? (parsed.arg = dataParsed.slice(1))
		: (parsed.arg = dataParsed.slice(1).join(' '));
	return parsed;
}

var con = mysql.createConnection({
	host: 'db4free.net',
	user: 'wholfgaming',
	password: process.env.PASSWORD,
	database: 'minecraftsrvdata'
});

//connect to database 
/*
con.connect(function(err) {
	if (err) throw err;
	console.log(`Connected to database!`);
});
*/

//events
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	msgParsed = parseCommand(msg.content, true);

	if (msgParsed.prefix === botPrefix && msg.author !== client) {
		//server message handler
		if (msg.channel.type !== 'dm') {
			switch (msgParsed.command.toLowerCase()) {
				case 'register':
					msg.author.send(
						'Register here!\nType in `/register [username] [password]`'
					);
					msg.reply('Check your DM to register');
					break;

				case 'spam':
					for (var i = 0; i < parseInt(msgParsed.arg[0]); i++) {
						msg.channel.send(msgParsed.arg[1]);
					}
					break;
			}
		}

		//private message handler
		if (msg.channel.type === 'dm') {
			switch (msgParsed.command.toLowerCase()) {
				case 'register':
					if (msgParsed.arg.length == 2) {
						const username = msgParsed.arg[0];
						const password = msgParsed.arg[1];
						msg.channel.send(
							`Confirm registering as:\nUsername: **${username}**\nPassword: **${password}**\nType ` +
								'`/n` ' +
								`to start over.\nType ` +
								'`/y` ' +
								`to move on.`
						);
						confirmHandler = true;
						yesNoType = 'register';
					} else {
						msg.channel.send(
							'To register, type: ```/register [username] [password]```'
						);
					}
					break;
					
				case 'delete' :
					if (msgParsed.arg.length == 2) {
						const username = msgParsed.arg[0];
						const password = msgParsed.arg[1];
						msg.channel.send(
							`Confirm deleting your account:\nUsername: **${username}**\nPassword: **${password}**\nType ` +
								'`/n` ' +
								`to cancel.\nType ` +
								'`/y` ' +
								`to confirm.`
						);
						confirmHandler = true;
						yesNoType = 'delete';
					} else {
						msg.channel.send(
							'To delete your account, type: ```/delete [username] [password]```'
						);
					}
					break;

				//confirm-cancel handling
				case 'y':
					if (confirmHandler == true) {
						switch (yesNoType) {
							case 'register' :
								msg.channel.send('Confirmed!\nSuccessfully Registered!');
								confirmHandler = false;
								yesNoType = undefined;
								//con.query()
								
							case 'delete' :
								msg.channel.send(`Your account has successfully deleted! We're sorry to see you go.`)
								confirmHandler = false;
								yesNoType = undefined;
						}
					}

				case 'n':
					if (confirmHandler == true) {
						switch (yesNoType) {
							case 'register' :
								msg.channel.send('Type `/register` to start over.');
								confirmHandler = false;
								yesNoType = undefined;
								
							case 'delete' :
								msg.channel.send(`Cancelled!`)
								confirmHandler = false;
								yesNoType = undefined;
						}
					}
			}
		}
	}
}
