const { RichEmbed } = require('discord.js')
module.exports = {
    name: "accept",
    category: "system",
    description: "Accepted a user",
    permission: "MANAGE_ROLES",
    usage: "accept",
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
                message.reply(`Please type the **department** you are accepting them for, you have 60 seconds.`).then((w) => {
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
                        if (!actualChannel) return message.reply(`Please setup the accept channel in the config`).then(c => c.delete(5000))
                        let embed = new RichEmbed()
                            .setTitle(`${user.user.tag} was accepted to ${dept}`)
                            .setDescription('Thank you for applying and congratualtion on your acception! Please watch #dept-ads or #staff-ads for when trainings happen! Hope to see you out there soon.')
                            .setColor("GREEN")
                            .setFooter(`Accepted by ${message.author.tag}`)
                        actualChannel.send(embed)
                        actualChannel.send(`Accept Notification | ${user}`)
                        message.channel.bulkDelete(3)
                    }))
                })
            }).catch((e => {
                message.reply(`You failed to answer in time.`)
            }))
        })
    }
}
