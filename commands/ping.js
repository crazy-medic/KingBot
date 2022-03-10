const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: 'ping',
    description: 'Responds to ping.',
    async execute(bot, message, args){
        const msg = await message.reply('Pinging....');
        msg.edit(`Pong! \n Latency is ${Math.floor(msg.createdTimstamp - message.createdTimstamp)}ms \nAPI latency is ${Math.round(bot.ping)}ms`);
        console.log(`Pinged by ${message.author.username} in guild ${message.guild.name}`);
    }
}