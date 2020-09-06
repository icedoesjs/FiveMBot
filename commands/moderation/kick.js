const { RichEmbed } = require('discord.js')
module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick a user by mention",
    permission: "KICK_MEMBERS",
    usage: "kick @user <reason>",
    run: async(client, message, args) => {
        await message.delete()

        if (!message.mentions.users.first()) {
            return message.reply(`Please mention a user!`)
        }

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply(`No permission!`)
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply(`I don't have permission!`)
        }

        const bye = message.mentions.users.first() || message.guild.members.get(args[0])
        const user = message.guild.member(bye)

        if (!bye) {
            return message.reply(`The member was not found`)
        }

        if (!bye.id === message.author.id) {
            return message.reply(`You can't kick yourself`)
        }

        try {
            await user.kick(args[1] || "No reason Provided!")
            const embed = new RichEmbed()
                .setAuthor(message.author.username)
                .setColor("RED")
                .setDescription(`**${bye.tag}** was kicked by **${message.author.tag}** for **${args[1] || "No reason Provided!"}**`)
                .setTimestamp()
            message.channel.send(embed)
        } catch (e) {
            message.reply(`Failed to kick the user!`)
        }
    }
}