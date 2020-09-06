const { RichEmbed } = require('discord.js')
module.exports = {
    name: "deny",
    category: "system",
    description: "Deny a user",
    permission: "MANAGE_ROLES",
    usage: "deny",
    run: async(client, message, args, base, prefix) => {
        await message.delete()
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('**You dont have permission!**').then(w => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        })
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.reply(`Please type the **ID** of the user you wish to accept, you have 60 seconds.`).then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(c => {
                let id = c.first().content;
                message.reply(`Please type the **department** you are denying them for, you have 60 seconds.`).then((w) => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then((de => {
                        let dept = de.first().content;
                        message.channel.bulkDelete(1)
                        let user = message.guild.members.get(id)
                        if (!user) return message.reply(`That user was not found!`).then(c => c.delete(5000))
                        let acceptChannel = base.acceptChannel
                        let actualChannel = message.guild.channels.find(c => c.id === acceptChannel)
                        if (!actualChannel) return message.reply(`Please setup the deny channel in the config`).then(c => c.delete(5000))
                        let embed = new RichEmbed()
                            .setTitle(`${user.user.tag} was denied for ${dept}`)
                            .setDescription('DENY MESSAGE HERE | DEBUG STFU')
                            .setColor("RED")
                            .setFooter(`Denied by ${message.author.tag}`)
                        actualChannel.send(embed)
                        actualChannel.send(`Deny Notification | ${user}`)
                        message.channel.bulkDelete(4)
                    }))
                })
            }).catch((e => {
                message.reply(`You failed to answer in time.`)
            }))
        })
    }
}