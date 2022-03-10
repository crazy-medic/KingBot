const Discord = require("discord.js");
const REmbed = require("discord.js");
const Functs = require("../functions");

var face = '';
const sides = ["👍", "👎"]

module.exports = {
    name: 'toss',
    description: 'Tosses a coin for heads/tails.',
    async execute(bot, message, args){

        if(!args[1]){
            let tossResult = Math.floor(Math.random() * 2) + 1;
            console.log(`coin landed ${tossResult}`);

            if(tossResult === 1){
                face = 'heads';
            }
            
            if(tossResult === 2){
                face = 'tails';
            }

            const tEmbed = new REmbed.RichEmbed()
                .setColor("RANDOM")
                .setTitle("Coin Toss.")
                .addField("Tossed coin landed on", face)
                .setTimestamp()

            console.log(`Coin tossed by ${message.author.username} in guild ${message.guild.name} landed on ${face}`);
            return message.channel.send(tEmbed);
        }
        else {
            let person = Functs.getMember(message, args[0]);

            if(!person || message.author.id === person.id) {
                person = message.guild.members
                    .filter(m => m.id !== message.author.id)
                    .random();
            }

            const tEmbed = new Discord.RichEmbed()
                .setColor("#ffffff")
                .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
                .setDescription("Add a reaction to one of these emojis to toss the coin!")
                .setTimestamp();

            const m = await message.channel.send(tEmbed);
            const reacted = await Functs.promptMessage(m, message.author, 30, sides);
            
            const botChoice = sides[Math.floor(Math.random() * sides.length)];

            const result = await getResult(reacted, botChoice);
            await m.clearReactions();

            tEmbed
                .setDescription("")
                .addField(result, `${reacted} vs ${botChoice}`);

            m.edit(tEmbed);
            console.log(`Coin tossed by ${message.author.username} against ${person.name} in guild ${message.guild.name} ended up in ${result}`);

            function getResult(me, botChoice){
                if ( me === "👍" && botChoice === "👎" || me === "👎" && botChoice === "👍" ) return message.channel.send("You Lost!");
                else return message.channel.send("You Won!");
            }
        }
    }
}