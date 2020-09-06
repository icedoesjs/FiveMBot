const { RichEmbed } = require('discord.js')
module.exports = {
    name: "apply",
    category: "system",
    description: "Sends Application Links",
    run: async(client, message, args, config, prefix, base) => {
        let embed = new RichEmbed()
        let logs = message.guild.channels.find(c => c.id === "710136798063493182")
        await message.delete()
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.reply(`Lets start, what **department** are you applying for?`).then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(c => {
                let dept = c.first().content
                let checkActive = message.guild.channels.find(c => c.name === `${message.author.id}-app`)
                if (checkActive) return message.reply(`It looks like you already have an active ticket here: ${checkActive}`)
                message.guild.createChannel(`${message.author.id}-app`, {
                    type: 'text',
                    permissionOverwrites: [{
                            allow: "VIEW_CHANNEL",
                            id: message.author.id
                        },
                        {
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id
                        },
                        {
                            allow: 'VIEW_CHANNEL',
                            id: '657501074676121601'
                        }
                    ]
                }).then(chan => {
                    if (dept.toLowerCase() == "dispatch") {
                        chan.send(`Ok, dispatch app started, you have 60 seconds to answer for each question.\n**Do you undertsand most common 10 codes?**`).then((w) => {
                            chan.awaitMessages(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(c => {
                                let tencodes = c.first().content
                                chan.send(`Do you have experience with Sonora CAD? It's okay if you don't`).then((w) => {
                                    chan.awaitMessages(filter, {
                                        max: 1,
                                        time: 60000,
                                        errors: ['time']
                                    }).then(c => {
                                        let cad = c.first().content
                                        chan.send(`How old are you?`).then((w) => {
                                            chan.awaitMessages(filter, {
                                                max: 1,
                                                time: 60000,
                                                errors: ['time']
                                            }).then(c => {
                                                let age = c.first().content
                                                chan.send(`Do you have a working microphone?`).then((w) => {
                                                    chan.awaitMessages(filter, {
                                                        max: 1,
                                                        time: 60000,
                                                        errors: ['time']
                                                    }).then(c => {
                                                        let mic = c.first().content
                                                        chan.send(`Do you have a stable internet connection `).then((w) => {
                                                            chan.awaitMessages(filter, {
                                                                max: 1,
                                                                time: 60000,
                                                                errors: ['time']
                                                            }).then(c => {
                                                                let internet = c.first().content
                                                                chan.send(`How many hours a day can you be on?`).then((w) => {
                                                                    chan.awaitMessages(filter, {
                                                                        max: 1,
                                                                        time: 60000,
                                                                        errors: ['time']
                                                                    }).then(c => {
                                                                        let hrs = c.first().content
                                                                        chan.send(`Why do you wish to be in communications?\nYou have 5 minutes`).then((w) => {
                                                                            chan.awaitMessages(filter, {
                                                                                max: 1,
                                                                                time: 300000,
                                                                                errors: ['time']
                                                                            }).then(c => {
                                                                                let com = c.first().content
                                                                                chan.send(`What do you think the 10 code “10-97” means?`).then((w) => {
                                                                                    chan.awaitMessages(filter, {
                                                                                        max: 1,
                                                                                        time: 60000,
                                                                                        errors: ['time']
                                                                                    }).then(c => {
                                                                                        let tennin = c.first().content
                                                                                        chan.send(`What do you think the communications department does?`).then((w) => {
                                                                                            chan.awaitMessages(filter, {
                                                                                                max: 1,
                                                                                                time: 300000,
                                                                                                errors: ['time']
                                                                                            }).then(c => {
                                                                                                let does = c.first().content
                                                                                                chan.send(`Do you hereby declare that all questions above have been answered to the full of your ability and answered truthfully. If you are caught lying on your application it will be an instant denial/removal from the department`).then((w) => {
                                                                                                    chan.awaitMessages(filter, {
                                                                                                        max: 1,
                                                                                                        time: 300000,
                                                                                                        errors: ['time']
                                                                                                    }).then(c => {
                                                                                                        message.channel.bulkDelete(2)
                                                                                                        let declare = c.first().content
                                                                                                        chan.delete()
                                                                                                        embed.setAuthor(`Application recieved from ${message.author.tag}`)
                                                                                                        embed.setColor(`GREEN`)
                                                                                                        embed.setDescription(`**Department Applied for** - ${dept}\n**Answers found below**`)
                                                                                                        embed.addField(`Understands basic 10 codes?`, `${tencodes}`)
                                                                                                        embed.addField(`Know's how to use a cad?`, `${cad}`)
                                                                                                        embed.addField(`User's age`, `${age}`)
                                                                                                        embed.addField(`Has a mic?`, `${mic}`)
                                                                                                        embed.addField(`Has reliable internet`, `${internet}`)
                                                                                                        embed.addField(`Why do they wish to be in dispatch`, `${com}`)
                                                                                                        embed.addField(`Understands 10-97?`, `${tennin}`)
                                                                                                        embed.addField(`What does dept do`, `${does}`)
                                                                                                        embed.addField(`Delaclare all questions answered to full?`, `${declare}`)
                                                                                                        embed.setFooter(`Made by the verified bot dev ICEYYM8`)
                                                                                                        logs.send(embed)
                                                                                                    })
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    } else {
                        return message.reply(`Only dispatch apps are setup right now :(`)
                    }
                })
            })
        })
    }
}
