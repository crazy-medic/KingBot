const Discord = require("discord.js");

let xp = require("../Storage/xp.json");

module.exports = {
    name: "level",
    description: "Returns the current level and xp of the member.",
    async execute(bot, message, args){
        if(!xp[message.author.id + message.guild.id]){
            xp[message.author.id + message.guild.id] = {
                xp: 0,
                level: 1
            };
        }

        let checkUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if(!checkUser){

            let curXp = xp[message.author.id + message.guild.id].xp;
            let curLvl = xp[message.author.id + message.guild.id].level;
            let nxtLvl = curLvl * 300;
            let difXp = nxtLvl - curXp;

            let lvlEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setColor("edcf0e")
                .addField("Level", curLvl, true)
                .addField("XP", curXp, true)
                .setFooter(`${difXp} XP till next level!`, message.author.displayAvatarURL);

            message.channel.send(lvlEmbed);
            console.log(`Level checked by ${message.author.username} in guild ${message.guild.name}`);

        }else{

            let curXp = xp[checkUser.id + message.guild.id].xp;
            let curLvl = xp[checkUser.id + message.guild.id].level;
            let nxtLvl = curLvl * 300;
            let difXp = nxtLvl - curXp;

            let lvlEmbed = new Discord.RichEmbed()
                .setAuthor(checkUser.displayName)
                .setColor("edcf0e")
                .addField("Level", curLvl, true)
                .addField("XP", curXp, true)
                .setFooter(`${difXp} XP till next level!`, message.author.displayAvatarURL);

            message.channel.send(lvlEmbed);
            console.log(`Level checked by ${message.author.username} of ${checkUser.displayName} in guild ${message.guild.name}`);
        }
        
    }
}