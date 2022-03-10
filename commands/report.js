const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Allows reporting users for things.',
    execute(message, args){
        let rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rUser) return message.channel.send("Mention a user to report!");
        let rReason = args.join(" ").slice(29);

        let reportEmbed = new Discord.RichEmbed()
            .setDescription("~Report!~")
            .setColor("FF0000")
            .addField("Reported User", `${rUser} with ID ${rUser.id}`)
            .addField("Reported by", `${message.author} with ID ${message.author.id}`)
            .addField("Reported in channel", message.channel)
            .addField("Time of report", message.createdAt)
            .addField("Reason", rReason)
            ;
            
        let reportsChannel = message.guild.channels.find(`name`, "incidents");
        if(!reportsChannel) return message.channel.send("Couldn't find the channel for listing reports!");
        message.delete().catch(O_o=>{});
        reportsChannel.send(reportEmbed);
        console.log(`Report used by ${message.author.username} in guild ${message.guild.name}`);
    }
}