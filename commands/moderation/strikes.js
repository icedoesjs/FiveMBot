const { RichEmbed } = require('discord.js');
const {set, fetch } = require('quick.db');
module.exports = {
    name: "strikes",
    category: "moderation",
    description: "Strike a user",
    permission: "KICK_USERS",
    run: async(client, message, args, base, prefix) => {
        let embed = new RichEmbed()
        let user = message.mentions.users.first() || message.author;
        let total = fetch(`PRP.strikes.${message.guild.id}.${user.id}`)
        if (total == undefined) total = 0

        embed.setDescription(`${user} has ${total} strikes!`)
        embed.setColor("RED")
        message.channel.send(embed)
    }
}