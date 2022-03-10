const Discord = require("discord.js");

module.exports= {
    name: 'user',
    description: 'Returns the user\'s username and ID.',
    execute(message, args){
        let uIcon = message.member.displayAvatarURL;
        const uEmbed = new Discord.RichEmbed()
            .setDescription("")
            .setColor("#ff0000")
            .setThumbnail(message.author.avatarURL)
            .addField("Your username", message.author.username, true)
            .addField("Your ID", message.member.id, true)
            .addField("Current server", message.guild.name)
            .addField("You joined", message.member.joinedAt);

        message.reply(uEmbed);
        console.log(`User info retrieved by ${message.author.username} in guild ${message.guild.name}`);
//        message.channel.send(`Hello ${message.author.username}`);
//      message.channel.send(`${message.author.id}`);
    }
}