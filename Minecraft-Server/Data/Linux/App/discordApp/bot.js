//headers
const Discord = require('discord.js');
const client = new Discord.Client();
const mysql = require('mysql');
require('dotenv').config

//bot token
client.login(process.env.BOT_TOKEN);

//variables
var botPrefix = '/'
const bold = '**'
const codeBlock = '``'

//functions
function parseCommand(data, parseArg) { 
  const parsed = {};
  const dataParsed = data.split(' ')
  parsed.prefix = dataParsed[0][0];        
  parsed.command = dataParsed[0].slice(1); 
  parseArg ?
      parsed.arg = dataParsed.slice(1) :
      parsed.arg = dataParsed.slice(1).join(' ')
  return parsed;
}

var con = mysql.createConnection({
  host: 'db4free.net',
  user: 'wholfgaming',
  password: process.env.PASSWORD,
  database: "minecraftsrvdata"
});

//events

/* gtw kenapa ini ga work
con.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to database!`);
});
*/



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', msg => {
	msgParsed = parseCommand(msg.content, true);
	
	if(msgParsed.prefix === botPrefix && msg.author !== client) {
		
		//server message handler
		if (msg.channel.type !== 'dm') {
			switch (msgParsed.command.toLowerCase()) {
			
				case 'register' :
					msg.author.send('Register here!\nType in `/register [username] [password]`')
					msg.reply('Check your DM to register');
					break;
				
				case 'spam' :
					for (var i = 0; i < parseInt(msgParsed.arg[0]); i++) {
						msg.channel.send(msgParsed.arg[1])
					}
					break;
			}
		}
		
		//private message handler
		if(msg.channel.type === 'dm') {
			
			switch (msgParsed.command.toLowerCase()) {
				
				case 'register' :
					if (msgParsed.arg.length == 2) {
						const username = msgParsed.arg[0];
						const password = msgParsed.arg[1];
						msg.channel.send(`Confirm registering as:\nUsername: ${username}\nPassword: ${password}\n[y/n]?`);
						//y/n handling here
						//create connection to db here
						
					} else {
						msg.channel.send('To register, type: ```/register [username] [password]```')
						
					}
					break;
					
			}
		}
	}
})
