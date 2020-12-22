//headers
const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql');
const config = require('./config.json');
const functions = require('./functions.js');
const con = functions.con;
const signalR = require("signalr-client");

//bot token
client.login(config.BOT_TOKEN);

//variables
var botPrefix = '/';
var confirmHandler = false;
var yesNoType;

//connect to database 
con.connect(err => {
	if (err) throw err;
	console.log(`Connected to database!`);
});

//events
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

	

	msgParsed = functions.parseCommand(msg.content, true);

	if (msgParsed.prefix === botPrefix && msg.author !== client) {
		
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
					    msg.channel.send('banned!');
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
	//Reltime setting up
	console.log('start the client signalR');

	let clientDC = new signalR.client(
		'http://localhost:4899/signalR',

		['discordHub']
	);
	/*
	 --------------------------------------------------------------------------------------
	 untuk mnegban gw g tau knp g work tap realtimenya jalan
	 --------------------------------------------------------------------------------------
	 */
	clientDC.on(
		'discordHub',
		'Banned',
		function (user) {
			console.log('banned ' + user);
			var member = msg.guild.members.resolve(user);

			if (member) {
				member.ban('reason')
					.then(() => msg.channel.send(user + ' got banned'))
					.catch(err => {
						console.error(err);
					});
			} else {
				console.warn(user + " isn't in this guild!");
            }
		});

	console.log('Client signalR started');
});

