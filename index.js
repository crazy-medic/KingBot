/*Package imports.*/
const Discord = require('discord.js');
const Util = require('discord.js');
const weather = require("weather-js");
const PREFIX = require("./prefixFile.json");
const token = require('./tokenFile.json');
const YTAPIKEY = require("./youtubeapikey.json");
const xp = require("./Storage/xp.json");
const coins = require("./Storage/coins.json");
const YouTube = require('simple-youtube-api');
const ytdl = require ("ytdl-core");
const fs = require('fs');
const moment = require('moment');
const cheerio = require("cheerio");
const request = require("request");
/* End of imports i guess...... XD.... */

/* Generating objects. */
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const youtube = new YouTube(YTAPIKEY.key);
const queue = new Map();
/* End of object declarations */

/* Reading the command files. */
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./Commands/${file}`);
    console.log(`${file} loaded!`);
    bot.commands.set(command.name, command);
}
/* End of file access protocol XD. */

/* Block for starting the bot. */
bot.on('ready', () =>{
    console.log('KingBot is ready');
    bot.user.setActivity("kb*help", {type: 'LISTENING'});
});
/* End of block for bot start. */

/* Bot command checks and function access. */
bot.on('message', async message => {

    /* Declaring global vars for this block. */       
    let args = message.content.substring(PREFIX.prefix.length).split(' ');
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    /* End of the variables. */

    /*XP section.*/
    let xpAdd = Math.floor(Math.random()*10)+1;
    if(!xp[message.author.id + message.guild.id]){
        xp[message.author.id + message.guild.id] = {
            xp: 0,
            level: 1
        };
    }
    let curLvl = xp[message.author.id + message.guild.id].level;
    let nxtLvl = curLvl * 300;
    xp[message.author.id + message.guild.id].xp += xpAdd;
    if(nxtLvl <= xp[message.author.id + message.guild.id].xp){
        xp[message.author.id + message.guild.id].level += 1;    
        let lvlUp = new Discord.RichEmbed()
            .setTitle("Level UP! 1️⃣⬆")
            .setColor("#edcf0e")
            .addField("Your New Level is :", xp[message.author.id + message.guild.id].level + 1);
    }  
    fs.writeFile("./Storage/xp.json", JSON.stringify(xp), (err) =>{
        if(err) {console.log(err);}
    });
    /* End of XP section. */


    /*Coin section*/
    var coinAmt = Math.floor(Math.random() * 3);
    if(!coins[message.author.id + message.guild.id]){
        coins[message.author.id + message.guild.id]= {
            money: 0,
            daily: "Not Collected"
        };
    }
    coins[message.author.id + message.guild.id].money += coinAmt;
    fs.writeFile("./Storage/coins.json", JSON.stringify(coins), (err1)=>{
        if(err1){ console.log(err1);}
    });
    /* End of Coin section. */


    /*Start of all bot commands...... */

    /* Music section. THIS CANT BE FILED SEPARATELY AT ALL FOR SOME REASON!!! */
    const serverQueue = queue.get(message.guild.id);
    if(args[0] === 'np' || args[0] === 'play' || args[0] === 'pause' || args[0] === 'queue' || args[0] === 'q' || args[0] === 'resume' 
    || args[0] === 'skip' || args[0] === 'stop' || args[0] === 'vol' || args[0] === 'volume'){
        
        if(args[0] === 'np'){
            if(!serverQueue) return message.reply('There is no songs!');
            return message.reply({embed:{
                title: "Now Playing",
                value: serverQueue.songs[0].title
            }});
        }

        if(args[0] === 'play'){
            const searchString = args.slice(1).join(' ');
            const url = args[1].replace(/<(.+)>/g, '$1');

            const voiceChannel = message.member.voiceChannel;
            if(!voiceChannel) return message.reply('You need to be in a voice channel to use this feature!');
            const permission = voiceChannel.permissionsFor(message.client.user);
            if(!permission.has('CONNECT')){
                return message.reply('I cannot join your voice channel make sure u have given me the permissions to do so!');
            }
            if (!permission.has('SPEAK')){
                return message.reply('I cannot speak in this channel please provide the permissions to do so!');
            }

            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                    }
                    catch (err) {
                        console.error(err);
                        return message.reply("No videos found with that name!");
                        console.log("none found on search!");
                    }
                }
            console.log(video.title, video.url);

            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            };

            if(!serverQueue) {
                const queueConstruct = {
                    textchannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                queue.set(message.guild.id, queueConstruct);

                queueConstruct.songs.push(song);
                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    queue.delete(message.guild.id);
                    return message.reply(`Could not join the voice channel: ${error}`);
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                return message.reply(`**${song.title}** has been added to the queue!`);
            }
            return undefined;
            /* bot.commands.get('play').execute(bot, serverQueue, message, args); */
        }

        if(args[0] === 'pause'){
            if(serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                console.log("Paused song!");
                return message.reply("Paused!");
            }
            return message.reply("Not playing any songs!");
        }

        if(args[0] === 'queue' || args[0] === 'q'){
            if(!serverQueue) return message.reply('There is no song in the queue!');
            return message.reply(` 
__**Song Queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now Playing:** ${serverQueue.songs[0].title}
The current volume is: ${serverQueue.volume}
            `);
        }

        if(args[0] === 'resume'){
            if(serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                console.log("Resumed playing!");
                return message.reply("Resumed!");
            }
            return message.reply("Not playing any songs!");
        }

        if(args[0] === 'skip'){
            if(!message.member.voiceChannel) return message.reply('You must be in a voice channel to use this feature!');
                if(!serverQueue) return message.reply('There is no more songs to skip!');
                serverQueue.connection.dispatcher.end('Skipped the song!');
                console.log(serverQueue.songs);
                return message.reply("Song Skipped!");
        }

        if(args[0] === 'stop'){
            if(!message.member.voiceChannel) return message.reply('You must be in a voice channel to use this feature!');
            if(!serverQueue) return message.reply('There is no more songs to stop!');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Stopped the song');
            message.reply("Stopped playing!");
            console.log('queue terminated!');
            return undefined;
        }

        if(args[0] === 'vol' || args[0] === 'volume'){
            if(!serverQueue) return message.reply('There is no songs!');
            if(!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`)
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 20);
            serverQueue.volume = args[1];
            console.log(`The current volume is: ${serverQueue.volume}`);
            return message.reply(`The volume has been adjusted to: **${serverQueue.volume}**`);
        }
    }
    /* End of Music section. */

    
    // Multiple commands under switch case..... LOL
    switch(args[0]){

        case '8ball':
            bot.commands.get('8ball').execute(message, args);
            break;

        case 'affinity':
            bot.commands.get('affinity').execute(bot, message, args);
            break;
        
        case 'balance':
            bot.commands.get('balance').execute(bot, message, args);
            break;

        case 'ban':
            bot.commands.get('ban').execute(bot, message, args);
            break;

        case 'bot':
            bot.commands.get('botinfo').execute(bot, message, args);
            break;

        case 'calc':
            bot.commands.get('calc').execute(bot, message, args);
            break;
        
        case 'coin':
            bot.commands.get('coin').execute(bot, message, args);
            break;
        
        case 'clear':
            bot.commands.get('clear').execute(message, args);
            break;

        case 'daily':
            bot.commands.get('daily').execute(bot, message, args);
            break;

        case 'devfbpage':
            bot.commands.get('devfbpage').execute(message, args);
            break;

        case 'droll':
            bot.commands.get('droll').execute(bot, message, args);
            break;
        
        case 'hate':
            bot.commands.get('hate').execute(message, args);
            break;

        case'hello':
            bot.commands.get('hello').execute(message, args);
            break;

        case 'hi':
            bot.commands.get('hello').execute(message, args);
            break;

        case 'help':    
            bot.commands.get('help').execute(message, args);
            break;

        case 'image':
            bot.commands.get('image').execute(message, args);
            break;

        case 'insta':
            bot.commands.get('insta').execute(bot, message, args);
            break;

        case 'level':
            bot.commands.get('level').execute(bot, message, args);
            break;

        case 'love':
            bot.commands.get('love').execute(message, args);
            break;

        case 'ping':
            bot.commands.get('ping').execute(bot, message, args);
            break;

        case 'report':
            bot.commands.get('report').execute(message, args);
            break;

        case 'remind':
            bot.commands.get('remind').execute(bot, message, args);
            break;
    
        case 'rps':
            bot.commands.get('rps').execute(bot, message, args);
            break;
        
        case 'server':
            bot.commands.get('server').execute(message, args);
            break;

        case 'toss':
            bot.commands.get('toss').execute(bot, message, args);
            break;

        case 'user':
            bot.commands.get('user').execute(message, args);
            break;

        case 'version':
            bot.commands.get('version').execute(message, args);
            break;

        /*  case 'weather':
            bot.commands.get('weather').execute(bot, message, args);
            break;
        */
    }
    /* End of switch statements. */

    //Start of if statements for those commands that could not be filed separately.
    if(args[0] === 'weather'){

        let city = args.slice(1).join(" ")
        weather.find({search: args.slice(1).join(" "), degreeType: 'C'}, function(err, result){
            if(err) message.channel.send(err);

            if(result.length === 0) return message.channel.send("Invalid location");

            var current = result[0].current;
            let location = result[0].location;
            
            const wEmbed = new Discord.RichEmbed()
                .setTitle(`Weather info for ${city}.`)
                .setColor("RANDOM")
                .setDescription(`**${current.skytext}**`)
                .setThumbnail(current.imageUrl)
                .addField('Time-Zone:', `UTC${location.timezone}`, true)
                .addField('Temperature', `${current.temperature} Degrees C`, true)
                .addField('Feels like', `${current.feelslike} Degrees C`, true)
                .addField('Wind speeds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true);

            message.channel.send(wEmbed);
        });
    }

    /* if(args[0] === 'restart'){
        //unknown if this works so not gonna keep my hopes up
        resetBot();
    } */
    /* End of if statements. */

});
/* End of bot command check and calls... */

/* Additional functions declarations for modules that run from index.js directly. */
function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if(!song){
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended!');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 20);
 
    const pEmbed = new Discord.RichEmbed()
        .setTitle("Music.")
        .setColor("#0000ff")
        .addField(`Now playing ${song.title}`, song.url)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
        .setFooter(`Playing at a volume of ${serverQueue.volume}`);

    serverQueue.textchannel.send(pEmbed);
}

/* Bot login block. */
bot.login(token.token);
/* End of bot loging block. */