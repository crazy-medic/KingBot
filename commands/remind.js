const Discord = require("discord.js");
const moment = require('moment');

let reminders = require("../Storage/reminders.json");

module.exports = {
    name: "remind",
    description: "Reminds the member about reminders",
    async execute(bot, message, args){

        if(!reminders[message.author.id + message.guild.id]){
            reminders[message.author.id + message.guild.id] = {
                reminder: '',
                time: "Not Set"
            };
        }

        //let reminder = reminders[message.author.id + message.guild.id].reminder;

        if(reminder != ''){
            message.reply("You can only have one reminder!!");
        }else{
            let time = args[0]*60*60*1000;
            let reminder2 = args.join(" ").slice(12);
            reminders[message.author.id + message.guild.id] = {
                reminder: reminder2,
                time: moment().format('L')+time
            };
        }

        let remindEmbed = new Discord.RichEmbed()
            .setTitle("Reminder!")
            .setDescription("Reminder about something for the user that set it.")
            .setColor(RANDOM)
            .addField("Reminder:",reminder,true);
        
        message.channel.send(remindEmbed);
    }
}