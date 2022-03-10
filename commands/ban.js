const Discord = require("discord.js");

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    execute(bot, message, args){
        
        let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!bUser) return message.channel.send("Mention a user to ban!");
        let bReason = args.join(" ").slice(27);
        console.log(`${bReason}`);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have the permissions!!").then(msg => (msg.delete(3000)));
        console.log(`${message.member} tried banning without permissions in guild ${message.guild.name}`);
        if(bUser.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send("You cant kick that person!!").then(msg => (msg.delete(3000)));
        console.log(`${message.member} tried kicking without permission ${bUser} who has permission in guild ${message.guild.name} LOL`);

        let banEmbed = new Discord.RichEmbed()
            .setDescription("~Ban!~")
            .setColor("#FF0000")
            .addField("Banned User", `${bUser} with ID ${bUser.id}`)
            .addField("Banned by", `<@${message.author}> with ID ${message.author.id}`)
            .addField("Banned in channel", message.channel)
            .addField("Time of ban", message.createdAt)
            .addField("Reason", bReason)
            ;

        let banChannel = message.guild.channels.find(`name`, "incidents");
        if(!banChannel) return message.channel.send("Couldn't find the channel for listing reports!");

        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed);
        console.log(`${message.member} has banned ${bUser} in guild ${message.guild.name}`);
    }
}
