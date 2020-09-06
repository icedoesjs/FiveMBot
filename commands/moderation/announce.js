const { RichEmbed } = require('discord.js')
module.exports = {
    name: "announce",
    category: "moderation",
    description: "Announce a message",
    permission: "MENTION_EVERYONE",
    usage: "announce <text>",
    run: async(client, message, args, base, prefix) => {
        message.delete()
        if (!message.member.hasPermission("MENTION_EVERYONE")) return message.channel.send('**You dont have permission!**').then(w => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        })
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.reply(`Please type what you want to **announce**, you have 60 seconds.`).then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(c => {
                let announcement = c.first().content;
                if (announcement.includes['nigger', 'nig', 'n1gg3r', 'n1gger']) return;
                c.delete()
                message.channel.bulkDelete(1)
                let embed = new MessageEmbed()
                    .setTitle(`Announcement!`)
                    .setColor('RED')
                    .setDescription(announcement)
                    .setFooter(`Made by Xen Development`)
                message.channel.send(embed)
                message.channel.send("@everyone")
                w.delete()
            }).catch((e) => {
                message.reply(`You failed to respond in time!, ${e}`)
            })
        })
    }
}