const Discord = require("discord.js");
const RichEmbed = require("discord.js");
const Funcs = require("../functions");

module.exports = {
    name: "affinity",
    description: "Calculates the love index with the tagged person!",
    async execute(bot, message, args){

        let person = Funcs.getMember(message, args[0]);

        if(!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random()*100;
        const affinity = Math.floor(love/10);
        const loveLevel = "💖".repeat(affinity) + "💔".repeat(10 - affinity);

        const embed = new RichEmbed.RichEmbed()
            .setColor("#ff0000")
            .addField(`☁ ${person.displayName} loves ${message.member.displayName} this much: \n 💗 ${Math.floor(love)}% \n\n ${loveLevel}`)
            .setThumbnail(person.user.displayAvatarURL);
        
        message.channel.send(embed);
    }
}