const Discord = require("discord.js");
const RichEmbed = require("discord.js");
const Functs = require("../functions");

const chooseArr = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"];
let dicefall = [];

module.exports = {
    name: 'droll',
    description: 'Returns a face of dice of n faces.',
    async execute(bot, message, args){

        const nembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to select the number of dices!")
            .setTimestamp();

        const m = await message.channel.send(nembed);
        const reacted = await Functs.promptMessage(m, message.author, 30, chooseArr);

        switch (reacted) {
            case '1️⃣':
                for(i = 0; i<1; i++){
                    dicefall.push(Math.floor(Math.random() * 6) + 1);
                }
                break;

            case '2️⃣':
                for(i = 0; i<2; i++){
                    dicefall.push(Math.floor(Math.random() * 6) + 1);
                }
                break;

            case '3️⃣':
                for(i = 0; i<3; i++){
                    dicefall.push(Math.floor(Math.random() * 6) + 1);
                }
                break;

            case '4️⃣':
                for(i = 0; i<4; i++){
                    dicefall.push(Math.floor(Math.random() * 6) + 1);
                }
                break;

            case '5️⃣':
                for(i = 0; i<5; i++){
                    dicefall.push(Math.floor(Math.random() * 6) + 1);
                }
                break;
        }
        
        let rEmbed = new RichEmbed.RichEmbed()
            .setTitle("Dice Roll.")
            .setColor("RANDOM")
            .addField(`The dice with ${reacted} faces rolled and fell on`, dicefall);

        message.channel.send(rEmbed);
    }
}