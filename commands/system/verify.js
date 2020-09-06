const { RichEmbed } = require('discord.js')
const { fetch } = require('quick.db')
module.exports = {
    name: "verify",
    category: "system",
    description: "Verify a user",
    run: async(client, message, args, config, prefix, base) => {
        let verChan = fetch(`PRP.vChan.${message.guild.id}`)
        if (verChan == undefined) return;
        if (message.channel.id !== verChan) return;
        let vRole = message.guild.roles.find(c => c.id === "700512979531333696")

        let embed = new RichEmbed()
            .setAuthor(`Thanks for verifying`)
            .setDescription(`Welcome to **PRP**`)
            .setColor("GREEN")
        message.member.send(embed)
        message.delete()
        message.member.addRole(vRole)
    }
}