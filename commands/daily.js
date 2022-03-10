const Discord = require("discord.js");
const moment = require("moment");

let coins = require("../Storage/coins.json");

module.exports = {
    name: "daily",
    description: "Adds the daily coins to the member's bank.",
    async execute(bot, message, args){
        if(!coins[message.author.id + message.guild.id]){
            coins[message.author.id + message.guild.id] = {
                money: 0,
                daily: "Not Collected"
            };
        }

        let lvlUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if(!lvlUser){

            if(coins[message.author.id + message.guild.id].daily != moment().format('L')){

                let money = coins[message.author.id + message.guild.id].money;
                coins[message.author.id + message.guild.id].money += 1000;
                coins[message.author.id + message.guild.id].daily = moment().format('L')

                let dEmbed = new Discord.RichEmbed()
                    .setTitle("Daily Collection")
                    .setColor("RANDOM")
                    .setDescription("Money Added to your account by #1000!");

                message.channel.send(dEmbed);
                console.log(`Daily coins added by ${message.author.username} in guild ${message.guild.name}!`);

            }
            else{

                let dEmbed2 = new Discord.RichEmbed()
                    .setTitle("Daily Collection")
                    .setColor("RANDOM")
                    .setDescription("You have already collected the daily for today!")
                    .addField("You can collect again in ", moment().endOf('day').fromNow());

                message.channel.send(dEmbed2);

            }
        }else{
            if(coins[message.author.id + message.guild.id].daily != moment().format('L')){

                let money1 = coins[lvlUser.id + message.guild.id].money;
                coins[lvlUser.id + message.guild.id].money += 1000;
                coins[message.author.id + message.guild.id].daily = moment().format('L')
                numb = 500
                var ran = Math.floor (Math.random() *(numb -1 +1 ) ) + 1
                coins[lvlUser.id + message.guild.id].money += ran

                let dEmbed3 = new Discord.RichEmbed()
                    .setTitle("Daily Collection")
                    .setColor("RANDOM")
                    .setDescription(`Money Added to ${lvlUser.displayName}'s account by #1000! \nBONUS ${ran} coins added`);

                message.channel.send(dEmbed3);
                console.log(`Daily coins donated by ${message.author.username} to ${lvlUser.displayName} in guild ${message.guild.name}!`);

            }
            else{

                let dEmbed4 = new Discord.RichEmbed()
                    .setTitle("Daily Collection")
                    .setColor("RANDOM")
                    .setDescription("You have already collected the daily for today!")
                    .addField("You can collect again in ", moment().endOf('day').fromNow());

                message.channel.send(dEmbed4);

            }
        }
    }
}