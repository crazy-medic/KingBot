const Discord = require("discord.js");
const REmbed = require("discord.js");

module.exports = {
    name: 'calc',
    description: "Performs basic math functions - (+, -, *, / & %)",
    async execute(bot, message, args){

        var val1 = parseFloat(args[2]);
        var val2 = parseFloat(args[3]);
        var result = 0;
        var str = '';

        if(args[1] === 'add'){
            result = val1 + val2;
            str = "Addition";
            console.log(str);
            console.log(result);
        }

        if(args[1] === 'sub'){
            result = Math.abs(val1 - val2);
            str = "Subtraction";
            console.log(str);
            console.log(result);
        }

        if(args[1] === 'multiply'){
            result = val1 * val2;
            str = "Multiplication";
            console.log(str);
            console.log(result);
        }

        if(args[1] === 'divide'){
            result = val1 / val2;
            str = "Division";
            console.log(str);
            console.log(result);
        }

        if(args[1] === 'mod'){
            result = val1 % val2;
            str = "Modulation";
            console.log(str);
            console.log(result);
        }

        const resEmbed = new REmbed.RichEmbed()
            .setTitle("Basic Calulator.")
            .setColor("RANDOM")
            .addField("Result of ", str)
            .addField(`between ${val1} and ${val2} is :`, result);
    
        return message.channel.send(resEmbed);
    }
}