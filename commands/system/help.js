const { RichEmbed } = require('discord.js')
module.exports = {
    name: "help",
    category: "misc",
    description: "Returns all commands, or one specific command info",
    usage: "help | help cmd",
    run: async(client, message, args, config, prefix, sman) => {
        if (args[0]) {
            return getCMD(client, message, args[0], prefix);
        } else {
            return menu(client, message, config, prefix, sman)
        }
    }
}

function menu(client, message, config, prefix) {
    let embed = new RichEmbed()
        .setColor("RED")
        .setDescription("> **Moderation Commands**\n\n**Strike** - Strike a user\n**Strikes** - See strikes\n**Set-strikes** - Set a user's strike to a #\n**Config** - Set the bot's options up\n**Settings** - See the guild's settings\n**Mute** - Mute a user for a time period\n**Kick** - Kick someone\n**Ban** - Ban someone\n**Embed** - Create & send an embed\n**Purge** - Delete some messages\n\n> **System commands**\n\n**Help** - This prompt\n**Report** - A prompt to report users or issues\n**Players** - See who's online")
        .setFooter(`Made by IceyyM8 | More to come <3`)
        .setTitle(`PRP Bot`)
    message.channel.send(embed)
}


function getCMD(client, message, input, config, prefix) {
    const embed = new RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Information was not found for **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor(`RED`).setDescription(info));
    }

    if (cmd.name) info = `**Command**: ${cmd.name}`;
    if (cmd.category) info += `\n**Category**: ${cmd.category}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) info += `\n**Usage**: ${cmd.usage}`;
    if (cmd.permission) info += `\n**Permission required**: ${cmd.permission}`;

    return message.channel.send(embed.setColor(`RED`).setDescription(info))
}