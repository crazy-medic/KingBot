const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Displays the server information.',
    execute(message, args) {
        let sIcon = message.guild.iconURL;
        let sEmbed = new Discord.RichEmbed()
            .setDescription("Server Information.")
            .setColor("#0000ff")
            .setThumbnail(sIcon)
            .addField("Server name : ", message.guild.name)
            .addField("Created on : ", message.guild.createdAt)
            .addField("You joined : ", message.member.joinedAt)
            .addField("Total Members:", message.guild.memberCount)
            .setFooter("Have fun while u stay!")
            ;
        
        console.log(`Server info retrieved by ${message.author.username} in guild ${message.guild.name}`);
        return message.channel.send(sEmbed);
    }
}