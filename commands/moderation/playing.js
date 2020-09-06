module.exports = {
    name: "playing",
    category: "moderation",
    description: "Set's the bot's activity",
    permission: "ADMINSTRATOR",
    usage: "playing <WATCHING, PLAYING, LISTENING> <text>",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        let type = args[0];
        let text = args.slice(1).join(" ")

        if (!type) return message.reply(`It seems you either didn't provide a type or provided an improper type.`)

        if (!text) return message.reply(`Please provide activity text.`)
        let finalT = type.toLocaleUpperCase()

        client.user.setActivity(text, {
            type: finalT
        }).then(message.reply(`The client's activity was set to **${finalT} ${text}**`))
    }
}