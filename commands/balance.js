const Discord = require("discord.js");
const Funcs = require("../functions");

let coins = require("../Storage/coins.json");

module.exports = {
    name: "balance",
    description: "Returns the coin balance of the member.",
    async execute(bot, message, args){
        if(!coins[message.author.id + message.guild.id]){
            coins[message.author.id + message.guild.id] = {
                money: 0
            };
        }

        let checkUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        
        if(!checkUser){
            let money = coins[message.author.id + message.guild.id].money;

            let balEmbed = new Discord.RichEmbed()
                .setTitle("Bank Balance!")
                .setAuthor(message.author.username)
                .setColor("RANDOM")
                .addField("Money", money, true);

            message.channel.send(balEmbed);

            console.log(`Coins checked by ${message.author.username} in guild ${message.guild.name}`);
        }else{
            let money = coins[checkUser.id + message.guild.id].money;

            let balEmbed = new Discord.RichEmbed()
                .setTitle("Bank Balance!")
                .setAuthor(checkUser.displayName)
                .setColor("RANDOM")
                .addField("Money", money, true);

            message.channel.send(balEmbed);

            console.log(`Coins checked by ${message.author.username} of ${checkUser.displayName} in guild ${message.guild.name}`);

        }

    }
}