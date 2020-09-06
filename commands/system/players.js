const { query } = require('gamedig');
const { RichEmbed } = require('discord.js')
module.exports = {
    name: "players",
    category: "system",
    description: "View players online",
    run: async(client, message, args, config, prefix, base) => {
        let embed = new RichEmbed()
        query({
            type: 'fivem',
            host: "69.4.92.90",
            port: 30120,
            maxAttempts: 4
        }).then((s) => {
            message.delete()
            if (s.players.length == 0) {
                embed.setAuthor(`PRP`)
                embed.setColor('ORANGE')
                embed.setDescription(`**It seems no players are online** :(`)
                message.channel.send(embed)
            } else {
                embed.setColor("GREEN")
                embed.setAuthor(`PRP`)
                embed.setDescription(`Online - ${s.players.length} of ${s.maxplayers}`)
                embed.setFooter(`IP: ${s.connect} | Showing the first 25 players`)
                try {
                    var start = s.players
                    if (start == null || start == []) {
                        var e = 0
                    } else {
                        var e = start.length
                    }

                    start.forEach(function(element) {
                        embed.addField(`**${element.name}**`, `Ping: **${element.ping}**`)
                    })

                    return message.channel.send(embed)
                } catch (e) {
                    embed.setColor(`RED`)
                    embed.setAuthor(`PRP is offline`)
                    embed.setDescription(`We should be back online soon.`)
                    message.channel.send(embed)
                }
            }
        }).catch(e => {
            embed.setColor(`RED`)
            embed.setAuthor(`PRP is offline`)
            embed.setDescription(`We should be back online soon.`)
            message.channel.send(embed)
        })
    }
}