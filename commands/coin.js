const Discord = require("discord.js");
const RichEmbed = require("discord.js");
const Funcs = require("../functions");

let coins = require("../Storage/coins.json");

module.exports = {
    name: "coin",
    description: "Transfers coins to the mentioned user",
    async execute(bot, message, args){

        let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if(!pUser || message.author.id === pUser.id) {
            message.reply("You cant do that!");
            return;
        }
        
        if(!coins[pUser.id+message.guild.id]){
            coins[pUser.id+message.guild.id] = {
                money: 0
            };
        }

        let sCoins = coins[message.author.id + message.guild.id].money;
        let pCoins = coins[pUser.id + message.guild.id].money;
        let transferAmt = parseInt(args[2]);

        if(sCoins<transferAmt){
            message.channel.send("You dont have sufficient balance!");
        }
        
        else {
            coins[message.author.id + message.guild.id] = {
                money: sCoins - transferAmt
            };

            coins[pUser.id + message.guild.id] = {
                money: pCoins + transferAmt
            };
        }

        const Cembed = new RichEmbed.RichEmbed()
            .setColor("RANDOM")
            .setTitle('Bank Payment!')
            .setDescription('Transfer of coins successful.')
            .addField('Paid by :',message.author.username)
            .addField('Paid to :',pUser.displayName)
            .addField('Paid Amount :',transferAmt);
        

        let reportsChannel = message.guild.channels.find(`name`, "incidents");
        if(!reportsChannel) return message.channel.send("Couldn't find the channel for listing reports!");
        message.delete().catch(O_o=>{});
        reportsChannel.send(Cembed);
        //message.channel.send(Cembed);
    }
}