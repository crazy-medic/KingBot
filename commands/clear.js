const Discord = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'Bulk Deletes the messages from the current channel.',
    execute(message, args) {

        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            console.log(`Unauthorized clear by ${message.author.id}`);
            return message.reply("You do not have permissions to clear messages!");
        } 

        try {
            if(args[1]>100) {
                console.log("number higher than 100 on clear!")
                return message.reply('Please use a number less than 100!')
            }
            message.channel.bulkDelete(args[1]);
            console.log(`bulkDeleted ${args[1]} msgs by ${message.author.username} in guild ${message.guild.name}!`);
            message.channel.send('Msgs cleared').then(msg => {msg.delete(5000)});
        } catch (error) {
            message.reply("You didnt mention the number of messages to clear!")
        }
    }
}

