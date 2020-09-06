const { fetch } = require(`quick.db`)
const ms = require('ms')
module.exports = {
    name: "create",
    category: "giveaways",
    aliases: ["cgive"],
    description: "Creates a public giveaway",
    permissions: "KICK_MEMBERS",
    example: ">create",
    run: async(client, message, args, manager) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You do not have permission`)
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`How long should the giveaway last?\nEx - **1d, 1m, 2.5hrs, 5s**`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let timeFrame = collected.first().content.toLowerCase();
                message.channel.send(`Ok, the giveaway will last **${timeFrame}**`)
                message.channel.send(`Next, what are you giving away?`).then(() => {
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    }).then(collected => {
                        let prize = collected.first().content
                        message.channel.send(`Ok, you are giving away **${prize}**`)
                        message.channel.send(`How many winner's shall we have?`).then(() => {
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 30000,
                                errors: ['time']
                            }).then(collected => {
                                let winners = collected.first().content.toLowerCase();
                                message.channel.send(`Ok, we will have **${winners}** winners`)
                                message.channel.send(`Finally, input the ID of the channel where it will be sent!`).then(() => {
                                    message.channel.awaitMessages(filter, {
                                        max: 1,
                                        time: 30000,
                                        errors: ['time']
                                    }).then(collected => {
                                        let channel = collected.first().content
                                        let realChannel = message.guild.channels.get(channel)
                                        if (!realChannel) return message.channel.send(`That's not a valid channel, please re-try`)
                                        client.giveawaysManager.start(realChannel, {
                                            time: ms(timeFrame),
                                            prize: prize,
                                            winnerCount: winners
                                        }).then(c => {
                                            message.channel.bulkDelete(`11`)
                                            return message.channel.send(`The giveaway was started in ${realChannel}`)
                                        })
                                    })
                                }).catch(e => {
                                    message.channel.send(`You failed to answer in time! - ${e}`)
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}