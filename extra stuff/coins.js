const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");

let userData = JSON.parse(fs.readFileSync('./Storage/userData.json', 'utf8'));

module.exports = {
    name: 'coins',
    description: 'Adds coins on texting in any channel.',
    execute(message, args){
        
        //let coins = require("./Storage/userData.json", 'utf8');
        let userData = JSON.parse(fs.readFileSync('./Storage/userData.json', 'utf8'));

        if(!userData[message.author.id]){
            userData[message.author.id] = {
                money: 0
            };
        }
        let uCoins = userData[message.author.id].money;
        let coinEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setColor("#0000FF")
                .addField("💰", uCoins);
            
        message.channel.send(coinEmbed).then(message => {message.delete(5000)});
    }
}