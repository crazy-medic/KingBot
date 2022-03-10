//const Discord = require("discord.js");

module.exports = {
    name: 'love',
    description: 'Responds to the love from the user.',
    execute(message, args){
        numb = 4
        var ran = Math.floor (Math.random() *(numb -1 +1 ) ) + 1;
        switch(ran){
            case 1:
                message.reply("I love you too!");
                break;
            case 2:
                message.reply("Aw thanks!");
                break;
            case 3:
                message.reply('Geez u love a machine, thats weird man...');
                break;
            case 4:
                message.reply('I hate you though!');
                break;
        }
    }
}