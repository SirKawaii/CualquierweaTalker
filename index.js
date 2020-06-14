const Utils = require('./utils/utils.js')
const Discord = require('discord.js');
const googleTTS = require('google-tts-api');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let prefix = "!";

client.on('message', msg => {
  if (msg.content ===  prefix + 'ping') {
    msg.reply( msg.author.username +' chupala!');
  }
  if(msg.content === prefix + 'join'){
    //joinToChannel(msg);
    talker.join(msg);
  }
  if(msg.content.startsWith(prefix + 'talk')){
    talker.talk(msg);
  }
  if(msg.content.startsWith(prefix + 'test')){
    talker.test(msg);
  }
  if(msg.content === prefix + 'leave'){
    talker.leave(msg);
  }
});

// client login .
let token = Utils.GetToken();
client.login(token);

// join to the channel

const talker = {

  current_channel: "",

  test(message){
    //message.reply('que wea?');
    //console.log(message.author.username);

    let test = message;

    console.log(JSON.stringify(test));

  },

  help(message){
    //noptingh
  },

  join(message){
    if(message.member.voice.channel){
      const connection = message.member.voice.channel.join();
      talker.current_channel = message.member.voice.channel.id;
    }
    else{
      message.reply('Acuerdate unirte a un canal de voz pao culiao!');
    }
    console.log("current channel:" + talker.current_channel);
  },

  leave(message){
    console.log("leave:");
    if(this.current_channel !== ""){
      message.reply("y se marcho.");
      
      if (message.guild.me.voiceChannel !== undefined) {
        message.guild.me.voiceChannel.leave();
        message.reply("I have successfully left the voice channel!");
      } else {
        message.reply("I'm not connected to a voice channel!");
      }
    }else{
      message.reply("No estoy en un canal de voz pao culiao.")
    }
  },

  talk(message){

    // limit to 300 characteres
    console.log("talk current channel : " + talker.current_channel );

    let parsedMessage = message.content.replace(prefix + "talk","");
    console.log(parsedMessage);
    let current_message = parsedMessage !== ""? parsedMessage  : null  ;
    console.log("current message: " + current_message);

    if(talker.current_channel !== null){
      client.channels.fetch(talker.current_channel).then((channel) =>{
        if (channel && channel.type === 'voice'){
          channel.join().then((conn) => {
            // que tiene esta wea
            let msg = current_message === null? "que wea querí": current_message;
            googleTTS(msg
            ,'es_ES',
            0.8)
            .then(function (url){
              conn.play(url);
            })
          });
        }
      });
    }else{
      message.reply('Acuerdate unirte a un canal de voz pao culiao!');
    }
  }
}


