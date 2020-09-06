const { RichEmbed } = require('discord.js');
module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans the tagged user!",
    permission: "BAN_MEMBERS",
    usage: "ban @user <reason>",
    run: async(client, message, args) => {
        message.delete()
        let embed = new RichEmbed();
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`It seems like you dont have permission for this`);
        let member = message.mentions.members.first();
        if (!member) return message.channel.send(`Please mention someone`);
        if (!member.bannable) return message.channel.send(`This user is not bannable`)
        if (member.user.id === message.author.id) return message.channel.send(`You cant ban yourself`)

        let reason = args.slice(1).join(" ");

        if (!reason) res = "No reason provided";
        if (reason) res = reason;

        await member.ban(res).catch(e => message.channel.send(`I couldnt ban this user because of this errror - ${e}`));

        embed.setColor(`RED`);
        embed.setTitle(`${member.user.tag} was banned`);
        embed.addField(`User`, member, true)
        embed.addField(`Moderator`, message.author, true)
        embed.addField(`Reason`, res)
        embed.setTimestamp()

        message.channel.send(embed);

        message.delete();
    }
}