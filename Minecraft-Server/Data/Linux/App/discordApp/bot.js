//headers
const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql');
const config = require('./config.json');
const functions = require('./functions.js');
const con = functions.con;
const signalR = require("signalr-client");
const messages = new Discord.Message;
const log = require('./logging.js');

//bot token
client.login(config.BOT_TOKEN);

//variables
var botPrefix = '/';
var confirmHandler = false;
var yesNoType;

//connect to database 
con.connect(err => {
	if (err) throw err;
	log.Info(`Connected to database!`);
	console.log(`Connected to database!`);
});

//connect to signalR
console.log('start the client signalR');
log.Debug('start the client signalR');

let clientDC = new signalR.client(
	'http://localhost:4899/signalR',

	['discordHub']
);

//events
client.on('ready', () => {
	log.Info(`Logged in as ${client.user.tag}!`);
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	clientDC.on(
		'discordHub',
		'Banned',
		function (user) {
			console.log('banned ' + user);

			client.channels.cache.get('790925380105666560').send('/ban <@' + user + '>');
		});
	//detect people chatting
	if (!msg.author.bot) {
		log.Info(`Chat -> [${msg.author.username}]::` + msg.content);
		console.log(`Chat -> [${msg.author.username}]::` + msg.content);
    }
	

	msgParsed = functions.parseCommand(msg.content, true);

	if (msgParsed.prefix === botPrefix && msg.author !== client) {


		//detect people using command
		log.Info(`CMD -> [${msg.author.username}]::` + msg.content);

		//server message handler
		if (msg.channel.type !== 'dm') {
			switch (msgParsed.command.toLowerCase()) {
				
				//account control
				case 'register':
					msg.author.send(
						'Register here!\nType in `/register [username] [password]`'
					);
					msg.reply('Check your DM to register');
					break;

				case 'delete':
					msg.author.send(
						'To delete your account, type in:\n`/delete [username] [password]`'
					);
					msg.reply('Check your DM to delete your account!');
					break;
					
				//server interaction	
				case 'spam':
					for (var i = 0; i < parseInt(msgParsed.arg[0]); i++) {
						msg.channel.send(msgParsed.arg[1]);
					}
					break;
					
				//ban action
				case 'ban':
					if (msg.member.hasPermission('ADMINISTRATOR')) {
						if (msg.channel.id === '790925380105666560') {
							let person = msg.guild.member(msg.mentions.users.first());

							person.ban({
								reason: 'mampus'
							});

							client.channels.cache.get('790925380105666560').send('Banned!');
                        }
						
					}
			
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
	
});

