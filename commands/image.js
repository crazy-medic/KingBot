const Discord = require("discord.js");
const cheerio = require("cheerio");
const request = require("request");

module.exports = {
    name: 'image',
    description: 'Returns a random image from Google.',
    execute(message, args){{
        image(message, args[1]);
    }
    function image(message, args){
            
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + `${args}`,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        console.log(`${args}`);
        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }
    
            $ = cheerio.load(responseBody);

            var links = $(".image a.link"); 
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            console.log(urls);
            if (!urls.length) {
                return;
            }
            // Send result
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            console.log(`Image sent to ${message.author.username} in guild ${message.guild.name}`);
        });
    }
}
}