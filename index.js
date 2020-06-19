const Utils = require('./utils/utils.js')
const Discord = require('discord.js');
const googleTTS = require('google-tts-api');
const { default: utils } = require('./utils/utils.js');
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
  if(msg.content === prefix + 'get'){
    talker.GetFromAPi(msg);
  }
  if(msg.content.startsWith(prefix + 'set_token')){
    talker.SetAccessToken(msg);
  }
  if(msg.content.startsWith(prefix + 'set_video')){
    talker.SetLiveVideoID(msg);
  }
});

// client login .
let token = Utils.GetToken();
client.login(token);


client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.member.displayName;
  let oldUserChannel = oldMember.member.displayName;

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    let message = ("¡Pero miren, " +newUserChannel +" ha llegado!") 
    talker.vocalize(message, null);

  } else if(newUserChannel === undefined){
    // User leaves a voice channel
    //let message = ("Se fue este culiao llamado " + newUserChannel) 
    //talker.vocalize(message, null);
  }
})

// join to the channel

const talker = {

  current_channel: null,
  facebook_access_token: null,
  live_channel_id: null,

  test(message){
    //message.reply('que wea?');
    //console.log(message.author.username);
    let test = message;
    console.log(JSON.stringify(test));
  },

  help(message){
    // work in progress
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
    
    
  },

  vocalize(current_message, message){
    if(this.current_channel !== null){
      client.channels.fetch(this.current_channel).then((channel) =>{
        if (channel && channel.type === 'voice'){
          channel.join().then((conn) => {
            // que tiene esta wea
            let msg = current_message === null? "que weá querí!": current_message;
            googleTTS(msg
            ,'es_ES',
            1) // velocitiiiiii 0.4 to 1
            .then(function (url){
              conn.play(url);
            })
          });
        }
      });
    }else{
      if(message !== null){
        message.reply("Acuerdate de agregarme a un canal de voz pao culiao.");
      }
    }
  },

  talk(message){
    // limit to 300 characteres
    console.log("talk current channel : " + talker.current_channel );
    let parsedMessage = message.content.replace(prefix + "talk","");
    let current_message = parsedMessage !== ""? parsedMessage  : null  ;
    console.log("current message: " + current_message);
    this.vocalize(current_message, message);
  },

  GetFromAPi(message){

    Utils.DoRequest(Utils.options, function(err, result){
      if(err){
          return console.log("Error while trying to get the data ", err);
      }
      Object.keys(result).forEach(el =>{

        let current = result[el]

        if(current.id === 7){
          message.reply(current.name);
        }
      });
    });
  },

  GetLiveVideoChat(message){

    if(this.live_channel_id === null){
      message.replace("Acuerdate de setear el channel id.");
      return;
    }
    if( this.facebook_access_token === null){
      message.replace("Acuerdate de setear el access token con !SET.");
      return;
    }

    let lastMessage = null;

    let apiPath = "/" + this.live_channel_id + "/live_comments?access_token=" + this.facebook_access_token

    let options = {
      host: "https://graph.facebook.com",
      port: 80,
      path: apiPath,
      method: 'GET'
    }

    Utils.DoRequest(options, function(err, result){
      if(err){
          return console.log("Error while trying to get the data ", err);
      }

      Object.keys(result.data).forEach(el =>{

        let current = result[el]
        talker.talk(current.message);
      });
    });
  },

  SetLiveVideoID(message){
    console.log("Set video id process...");
    let id = message.content.replace(prefix + "set_video","").replace(/\s/g, "");
    if(id !== ""){
      this.live_channel_id = id;
      console.log("video id has saved:"  + id)
      message.reply("Live video ID has been saved.");
    }else{
      message.reply("something happends. 🦽");
    }
    console.log("Set video id ended");
  },

  SetAccessToken(message){
    let token = message.content.replace(prefix + "set_token","").replace(/\s/g, "");
    if(token !== ""){
      this.facebook_access_token = token;
      console.log("token saved :" + token)
      message.reply("Token has been saved.");
    }else{
      message.reply("something happends. 🦽");
    }
  }

}