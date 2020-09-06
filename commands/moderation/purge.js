module.exports = {
    name: "purge",
    category: "moderation",
    description: "Removes the # of messages",
    permission: "MANAGE_MESSAGES",
    usage: "purge <#>",
    run: async(client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply(`You dont have permission`)
        }
        if (!args[0]) {
            return message.reply(`Please supply a number of messages to **delete**!`)
        } else if (isNaN(args[0])) {
            return message.reply(`**${args[0]}** is not a number!`)
        } else if (args[0]) {
            try {
                message.channel.bulkDelete(args[0])
                return message.channel.send(`**${args[0]}** messages were deleted by **${message.author.tag}**`)
            } catch (e) {
                return message.reply(`Either the messages are older than **14 days** or **I have no perms!**`)
            }
        } else {
            return message.reply(`Either the messages are older than **14 days** or **I have no perms!**`)
        }
    }
}