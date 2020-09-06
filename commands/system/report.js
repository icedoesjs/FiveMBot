const { RichEmbed } = require('discord.js')
const { fetch } = require('quick.db')
module.exports = {
    name: "report",
    category: "system",
    description: "Report a user",
    usage: "report",
    run: async(client, message, args, config, prefix, base) => {
        await message.delete()
        let channelF = fetch(`PRP.reportC.${message.guild.id}`)
        if (!channelF || channelF == undefined) channelF == "700511257555370005"
        let reportchan = message.guild.channels.find(c => c.id === channelF)

        const filter = response => {
            return response.author.id === message.author.id
        };
        message.reply(`Do you want to report a user or an issue\nType **user** or **issue**`).then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(c => {
                let type = c.first().content;
                let lower = type.toLowerCase()
                if (lower == "user") {
                    message.reply(`Please type the user's in-game name or discord ID`).then((w) => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(c => {
                            let uinfo = c.first().content;
                            message.reply(`Please type the report text.`).then((w) => {
                                message.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 60000,
                                    errors: ['time']
                                }).then(c => {
                                    let reporttxt = c.first().content
                                    let embed = new RichEmbed()
                                    embed.setTitle("A report was submitted")
                                    embed.setColor("ORANGE")
                                    embed.setFooter(`Reported by ${message.author.tag}`)
                                    let typeu = 2
                                    if (isNaN(uinfo)) typeu = 1
                                    if (typeu == 1) {
                                        embed.setDescription(`User's in-game name: **${uinfo}**\n**Report reason:** ${reporttxt}`)
                                        reportchan.send(embed)
                                    }
                                    let finder = message.member.guild.members.get(uinfo)
                                    if (finder) {
                                        embed.setDescription(`User's discord: **${finder}**\n**Report reason:** ${reporttxt}`)
                                        reportchan.send(embed)
                                    }
                                    message.channel.bulkDelete(4)
                                    message.channel.send(`Your report was submitted!`)
                                })
                            })
                        }).catch(e => {
                            message.reply(`Failed to send - ${e}`)
                        })
                    })
                } else if (lower == "issue") {
                    message.reply(`Please type the report text.`).then((w) => {
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(c => {
                            let text = c.first().content
                            let embed = new RichEmbed()
                                .setColor("ORANGE")
                                .setDescription(text)
                                .setFooter(`Reported by ${message.author.tag}`)
                                .setTitle(`An issue was reported`)
                            reportchan.send(embed)
                            message.channel.bulkDelete(4)
                            message.channel.send(`Your report was submitted!`)

                        }).catch(e => {
                            message.reply(`It seems the message failed - ${e}`)
                        })
                    })
                }
            })
        })
    }
}