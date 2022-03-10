const Discord = require("discord.js");
const Functs = require("../functions.js");

const chooseArr = ["⛰️", "📰", "✂️"];

module.exports = {
    name: "rps",
    description: "Rock Paper Scissors game.",
    async execute(bot, message, args){
        const embed = new Discord.RichEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await Functs.promptMessage(m, message.author, 30, chooseArr);
        
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.clearReactions();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);
        console.log(`RPS played with bot by ${message.author.username} in guild ${message.guild.name}`);

        function getResult(me, botChoice){
            if ( me === "⛰️" && botChoice === "📰" || me === "📰" && botChoice === "✂️" || me === "✂️" && botChoice === "⛰️" ) return message.channel.send("You Lost!");
            else if (me === botChoice) return message.channel.send("Its a tie!");
            else return message.channel.send("You Won!");
        }
    }
}