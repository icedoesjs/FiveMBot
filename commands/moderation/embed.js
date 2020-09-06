const { RichEmbed } = require('discord.js')
module.exports = {
    name: "embed",
    category: "moderation",
    description: "Create an embed",
    permission: "MANAGE_MESSAGES",
    usage: "embed",
    run: async(client, message, args, base, prefix) => {
        message.delete()
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('**You dont have permission!**').then(w => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        })
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.reply(`Please type what you want the **title** to say, you have 60 seconds.`).then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(c => {
                let title = c.first().content;
                message.reply(`Please type what you want the **description** to say, you have 60 seconds.`).then((w) => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then((de => {
                        let desc = de.first().content;
                        message.channel.bulkDelete(1)
                        let embed = new RichEmbed()
                            .setTitle(title)
                            .setDescription(desc)
                            .setColor("RED")
                            .setFooter("Made by IceyyM8 for PRP")
                        message.channel.send(embed)
                        message.channel.bulkDelete(3)
                    }))
                })
            }).catch((e => {
                message.reply(`You failed to answer in time.`)
            }))
        })
    }
}