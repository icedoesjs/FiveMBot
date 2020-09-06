const ms = require('ms')
module.exports = {
    name: "re-roll",
    category: "giveaways",
    aliases: ["croll"],
    description: "Re-roll a public giveaway",
    permissions: "KICK_MEMBERS",
    example: ">re-roll",
    run: async(client, message, args, manager) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You do not have permission`)

        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`What is the message ID of the giveaway you want to re-roll?`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let messageID = collected.first().content;
                client.giveawaysManager.reroll(messageID).then(() => {
                    message.channel.send(`Ok, I re-rolled the giveaway`)
                }).catch(e => {
                    message.channel.send(`The giveaway by ID ${messageID} was not found`)
                })
            }).catch(e => {
                message.channel.send(`You didnt respond in time`)
            })
        })
    }
}