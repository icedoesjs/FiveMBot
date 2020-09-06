const { RichEmbed } = require('discord.js')
let embed = new RichEmbed()
embed.setColor(`ORANGE`)
embed.setTitle(`**Department Announcement**`)
module.exports = {
    name: "ad",
    category: "moderation",
    description: "Sent a dept ad",
    permission: "MANAGE_ROLES",
    run: async(client, message, args, base, prefix) => {
        var adTxt = args.slice(0).join(" ")
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(`**You do not have permission**`);
        if (!adTxt) return message.channel.send(`**Please supply an ad after the command**`);

        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send("**Please type the departement\nYou can choose ``LEO``, ``FIRE``, ``DISPATCH``**").then((w) => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(c => {
                let dept = c.first().content;
                let realDep = dept.toLowerCase()
                let channeltoSend = message.guild.channels.find(c => c.id === "707018581770108950") /// Fucking test lounge channel ID here!
                if (adTxt.length >= 1024) return message.reply(`It seems the length of your ad is over the char limit.`)
                if (realDep !== "leo" || realDep !== "fire" || realDep !== "dispatch") return message.channel.send(`That's not a valid department.`)
                embed.setFooter(`Announced by ${message.author.username} | Made by the fucking verified bot dev`)
                if (realDep == 'leo') {
                    embed.setDescription(adTxt)
                    channeltoSend.send(embed)
                    channeltoSend.send(`LEO Notification | <@709658168200003615>`)
                } else if (realDep == "fire") {
                    embed.setDescription(adTxt)
                    channeltoSend.send(embed)
                    channeltoSend.send(`Fire Notification | <@694101089154498670>`)
                } else if (realDep == "dispatch") {
                    embed.setDescription(adTxt)
                    channeltoSend.send(embed)
                    channeltoSend.send(`Fire Notification | <@697439691389009940>`)
                } else {
                    message.channel.send(`Im sorry, I failed to find that dept.`)
                }
            }).catch(e => {
                message.channel.send(`It seems you ran out of time!`)
            })
        })
    }
}