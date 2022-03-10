//const Discord = require("discord.js");

module.exports = {
    name: 'devfbpage',
    description: 'Returns the webpage of the bot\'s developer',
    execute(message, args){
        message.reply('https://www.facebook.com/vinevarrier');
        console.log(`Your fb page was linked by ${message.author.username} in guild ${message.guild.name}`);
    }
}