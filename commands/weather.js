const weather = require("weather.js");
const Discord = require("discord.js");

module.exports = {
    name: "weather",
    description: "Returns local weather conditions.",
    async execute (bot, message, args) {

        let location = args.slice(1).join(" ");

        weather.find({search: location, degreeType: "C"}, function(err, result){
            if(err) message.channel.send(err);
            
            message.channel.send(JSON.stringify(result[0].current, null, 2));
        });
    }
}