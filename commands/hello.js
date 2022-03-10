//const Discord = require("discord.js");

module.exports = {
    name: 'hello',
    description: 'Responds to a hello.',
    execute(message, args){
        Num = 11
        var rand = Math.floor (Math.random() * (Num - 1 + 1)) + 1;
        if (rand%2 == 0) {
            message.reply('Hello!');
        }
        else{
            message.reply('Hi there!');
        }
        console.log(`Greeted ${message.author.username} in guild ${message.guild.name}`)
    }
}
