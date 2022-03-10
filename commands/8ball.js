//const Discord = require("discord.js");

module.exports = {
    name: '8ball',
    description: 'Answers the question with pass or not pass.',
    execute(message, args){
    ballmessage = message.content.slice(9);
    Num = 2
    var rand = Math.floor (Math.random() * (Num - 1 + 1)) + 1;
    switch(rand) {
        case 1:
            message.reply('The 8ball says that "' + ballmessage + '"will come to pass!"');
            break;
        case 2:
            message.reply('The 8ball says that "' + ballmessage + '"will not come to pass!"');
            break;
    }}
}