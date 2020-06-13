const Utils = require('./utils/utils.js')
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('chupala');
  }
});

let token = Utils.GetToken();
client.login(token);