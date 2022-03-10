const Discord = require("discord.js");

module.exports = {
    name: 'botinfo',
    description: 'Returns information on the bot',
    execute(bot, message, args){
        let bIcon = bot.user.displayAvatarURL;
        let embed = new Discord.RichEmbed()
            .setDescription("Bot Information!")
            .setColor("#00ff0f")
            .setThumbnail(bIcon)
            .addField("Bot name:", bot.user.username)
            .addField("Developed by", `Vineeth Achuthan with Discord Tag : ${"vineethtv001#9889"}`)
            .addField("Created on:", bot.user.createdAt)
            .setFooter("You can add me using my ID on Discord")
            ;
        //console.log(`${owner}`);
        console.log(`Bot info retrived by ${message.author.username} in guild ${message.guild.name}`);
        return message.channel.send(embed);
        
    }
}