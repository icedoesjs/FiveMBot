module.exports = {
    name: "say",
    category: "system",
    description: "Say something",
    run: async(client, message, args, config, prefix, base) => {
        let say = args.slice(0).join(" ")
        if (!say) return message.reply(`You must say something after the command`)


        message.delete()
        message.channel.send(say)
    }
}