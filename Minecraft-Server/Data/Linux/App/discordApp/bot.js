//headers
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config

//bot token
client.login(process.env.BOT_TOKEN);

//variables
var botPrefix = '/'

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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	msgParsed = parseCommand(msg.content, true);
	if(msgParsed.prefix === botPrefix) {
		switch (msgParsed.command) {
			case 'login' :
				//do something
				break;
			case 'spam' :
				for (var i = 0; i < msgParsed.arg[0]; i++) {
					msg.channel.send(msgParsed.arg[1])
				}
		}
	}
})
