const { RichEmbed } = require('discord.js');
const {set, fetch } = require('quick.db');
module.exports = {
    name: "strike",
    category: "moderation",
    description: "Strike a user",
    permission: "KICK_USERS",
    usage: ">strike @user",
    run: async(client, message, args, base, prefix) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You don't have permission.`).then((w) => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        })
        if (!args[0]) return message.reply(`Please mention a **user**.`).then((wtwo => {
            setTimeout(() => {
                wtwo.delete()
            }, 5000)
        }))
        if (message.mentions) {
            let user = message.mentions.users.first() || message.guild.members.get(args[0])
            let mem = message.guild.member(user)
            const filter = response => {
                return response.author.id === message.author.id
            };
            message.reply(`Please type the **reason** for the strike, you have 60 seconds.`).then((w) => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(c => {
                    let total = fetch(`PRP.strikes.${message.guild.id}.${user.id}`)
                    let reason = c.first().content
                    let embed = new RichEmbed()
                    embed.setColor('RED')
                    embed.setAuthor(`${user.tag} was striked!`)
                    embed.setDescription(`Striked by **${message.author.tag}** for **${reason}**`)
                    if (total == undefined || total == null || !total || total == 0) {
                        let total = 1
                        set(`PRP.strikes.${message.guild.id}.${user.id}`, 1)
                        embed.setFooter(`Total strikes: ${total}`)
                    }
                    if (total == 1) {
                        let total = 2;
                        set(`PRP.strikes.${message.guild.id}.${user.id}`, 2)
                        embed.setFooter(`Total strikes: ${total}`)
                    }
                    if (total == 2) {
                        let total = 3;
                        set(`PRP.strikes.${message.guild.id}.${user.id}`, 0)
                        embed.setFooter(`Total strikes: ${total}`)
                    }
                    message.channel.send(embed)
                }).catch((e => {
                    message.reply(`You failed to answer in time. ${e}`)
                }))

            })
        }
    }
}