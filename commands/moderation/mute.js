const { RichEmbed } = require('discord.js')
const ms = require('ms')
const { fetch } = require('quick.db')
module.exports = {
    name: "mute",
    category: "moderation",
    description: "Mute a user",
    permission: "KICK_MEMBERS",
    usage: "mute @user <time> | time = 1m, 3d, 1h etc",
    run: async(client, message, args) => {
        let mrole = fetch(`PRP.mrole.${message.guild.id}`)
        let dtime = fetch(`PRP.mtime.${message.guild.id}`)
        if (dtime == undefined || !dtime) dtime == 20
        if (mrole == undefined || !mrole) mrole = "700037410280439809"
        await message.delete()
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You dont have permission`).then((w => {
            setTimeout(() => {
                w.delete()
            }, 5000)
        }))

        if (!args[0]) return message.reply(`Please mention someone!`)

        let time = args[1] || dtime
        let user = message.mentions.users.first()
        let final = message.guild.member(user)
        let mutedt = ms(time)
        let mutedr = message.guild.roles.find(r => r.id == mrole)
        if (!mutedt) message.reply(`The muted role isnt setup!`)
        let embed = new RichEmbed()
            .setDescription(`${final} was muted by ${message.author} for **${time}**`)
            .setColor("ORANGE")
        message.channel.send(embed)
        final.addRole(mutedr).catch(e => message.reply(`Failed to add role - ${e}`))
        setTimeout(() => {
            final.removeRole(mutedr)
            final.send(`You were unmuted in **${message.guild.name}**`)
        }, mutedt)
    }
}