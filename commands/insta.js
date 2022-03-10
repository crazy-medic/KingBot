const rEmbed = require("discord.js");
const stripIndents = require("common-tags");
const fetch = require("node-fetch");

module.exports = {
    name: "insta",
    description: "Displays instagram stats of the tagged user.",
    async execute(bot, message, args){
        const name = args.slice(1).join(" ");

        if(!name) {
            return message.channel.send("You didnt tag anyone!!").then(m => m.delete(5000));
        }
        const url = `https://instagram.com/${name}/?__a=1`;
        const res = await fetch(url).then(url => url.json());

        if(!res.graphql.user.username){
            return message.channel.send("Could not find that account!").then(m => m.delete(5000));
        }

        console.log(res);
        const account = res.graphql.user;

        let iEmbed = new rEmbed.RichEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(account.external_url_linkshimmed)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile Information", stripIndents.stripIndent`**Username:** ${account.username}
            **- Full name:** ${account.full_name}
            **- Biography:** ${account.biography == 0 ? "none" : account.biography}
            **- Posts:** ${account.edge_owner_to_timeline_media.count}
            **- Followers:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Private?:** ${account.is_private ? "Yes 🔒" : "Nope 🔓"}`);

        message.channel.send(iEmbed);
        console.log(`Insta search done by ${message.author.username} in guild ${message.guild.name}`);
    }
}