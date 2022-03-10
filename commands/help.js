const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Sends a documentation of all commands.',
    execute(message, args){
        message.reply({embed:{
            title: "Help",
            description: "All the commands available with the bot with their Aliases(command) : ",
            color: 0xF1C40F,
            fields: [
                {
                    name: "Fun",
                    value: "Hello or Hi (hi/hello) \n Love (love) \n Hate (hate) \n 8Ball (8ball) \nRock Paper Scissors (rps) \n Image (image category) \n Coin Toss \n(toss/ toss taguser) \n Dice Roll (droll) ",
                    inline: true
                },
                {
                    name: "Admin",
                    value: "Clear Chat (clear amt) \n Reminder \n (reminder time topic) \n Report \n (report user reason) \n Ban (ban user reason)",
                    inline: true
                },
                {
                    name: "Social",
                    value: "Love Affinity (affinity @user) \n User Level (level) \n Instagram search (insta username) ",
                    inline: true
                },
                {
                    name: "Music",
                    value: "Play (play) \n Skip (skip) \n Stop (stop) \n Volume (vol/volume 1-20) \n Queue (queue/q) \n Pause (pause) \n Resume (resume)",
                    inline: true
                },
                {
                    name: "Server",
                    value: "Serverinfo (server) \n Botinfo (bot) \n Developer Page \n(devfbpage) \n Userinfo (user) \n Version (version) \n Ping (ping) \n Weather (weather city) ",
                    inline: true
                },
                {
                    name: "Economy",
                    value: "Balance (balance/bal) \n Daily (daily) \n Coin \n (coin user amt)",
                    inline: true
                },
                {
                    name: "Basic Calculator :",
                    value: "Calculate \n (calc operation val1 val2)",
                    inline: true
                }
            ]
        }});
        console.log(`Help loaded by ${message.author.username} in guild ${message.guild.name}`);
    }
}
