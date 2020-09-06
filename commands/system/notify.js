const { fetch } = require('quick.db')
module.exports = {
    name: "notify",
    category: "system",
    description: "Enables notifications from us",
    run: async(client, message, args, config, prefix, base) => {
        let role = fetch(`PRP.${message.guild.id}.notify`)
        if (!role || role == undefined) role = "703148234889101402"
        let find = message.guild.roles.find(r => r.id === role)
        if (!role) return message.reply(`Im sorry, the system isn't setup.`)
        let mem = message.guild.member(message.author)
        if (mem.roles.has(role)) {
            mem.removeRole(role)
            message.channel.send(`**You disabled notifications.**`)
        } else {
            mem.addRole(find)
            message.channel.send(`**You enabled notifications.**`)
        }
    }
}