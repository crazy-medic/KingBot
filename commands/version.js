//const Discord = require("discord.js");

module.exports = {
    name: 'version',
    description: 'Returns the version of the bot.',
    execute(message, args){
        message.reply('Version 2.0');
        console.log(`Version checked by ${message.author.username} in guild ${message.guild.name}`);
    }
}