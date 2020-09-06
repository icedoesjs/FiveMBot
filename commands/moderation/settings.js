const { RichEmbed } = require('discord.js')
const { fetch } = require('quick.db')
module.exports = {
    name: "settings",
    category: "moderation",
    description: "See current guild settings",
    permission: "ADMINISTRATOR",
    run: async(client, message, args) => {
        let embed = new RichEmbed()
        let reportc = fetch(`PRP.reportC.${message.guild.id}`)
        let mrole = fetch(`PRP.mrole.${ message.guild.id}`)
        let mtime = fetch(`PRP.mtime.${ message.guild.id}`)
        let vChan = fetch(`PRP.vChan.${message.guild.id}`)
        if (reportc == undefined) reportc = "None set";
        if (mrole == undefined) mrole = "None set";
        if (mtime == undefined) mtime = "20m";
        let rc = message.guild.channels.find(c => c.id === reportc)
        let mrolef = message.guild.roles.find(r => r.id === mrole)
        if (vChan == undefined) vChan = "None set";
        let findC = message.guild.channels.find(c => c.id === vChan)
        let wtext = fetch(`MSRP.wtxt.${message.guild.id}`)
        if (wtext == undefined) wtext = "Not yet set, default is ``Welcome to PRP, please look around and enjoy!``"
        let logC = fetch(`MSRP.LogC.${message.guild.id}`)
        if (logC == undefined) logC = "None set";
        let finalCLog = message.guild.channels.find(c => c.id == logC)
        if (finalCLog == null) finalCLog = "None set";
        let channel = fetch(`PRP.${message.guild.id}.strikeLogs`)
        let strikeR = fetch(`PRP.${message.guild.id}.strikeRole`)
        let realStrikRole = message.guild.roles.find(r => r.id === strikeR)
        if (realStrikRole == null) realStrikRole == "None set"
        let strikeChan = message.guild.channels.find(c => c.id === channel)
        if (strikeChan == null) strikeChan == "None set yet!"


        embed.setTitle("Current guild settings")
        embed.setColor("RED")
        embed.setDescription(`Report channel - ${rc}\nMuted role - ${mrolef}\nDefault mute time - **${mtime}**\nVerification channel - ${findC}\nWelcome Text - **${wtext}**\nLog channel - ${finalCLog}\nStrike role - ${realStrikRole}\nStrike notif chan - ${channel}`)
        message.channel.send(embed)
    }
}