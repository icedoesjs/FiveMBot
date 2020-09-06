const { Collection, Client, RichEmbed } = require('discord.js');
const client = new Client();
const { base } = require('./config/config.json');
const {set, fetch, add } = require('quick.db');
const { readdirSync } = require('fs');
const { success, error, warning, info } = require('log-symbols');
const { players } = require('./functions/players.js')
const { updateChan } = require('./functions/memcount.js')
const { GiveawaysManager } = require("discord-giveaways");


let id = base.id;
let ip = base.ip
let idt = base.memcountID

const manager = new GiveawaysManager(client, {
    storage: "./data/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "GREEN",
        reaction: "🎉"
    }
});
client.giveawaysManager = manager;


client.commands = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
});

client.categories = readdirSync("./commands/");


client.once('ready', function() {
    console.log(success, `I am online as ${client.user.tag}`)
    setInterval(() => {
        players(client, id, ip)
    }, 10000)
    setInterval(() => {
        updateChan(client, idt)
    }, 10000)
    if (base.type !== 'PLAYING', 'WATCHING', 'STREAMING', 'LISTENING') base.type == 'WATCHING';
    if (!base.activity) base.activity == "PRP!"
    if (base.type == "STREAMING" && base.streamlink) {
        client.user.setActivity(base.activity, {
            type: base.type,
            link: base.streamlink
        });
    } else if (base.type == "STREAMING" && !base.streamlink) {
        console.error(error, "No stream link provided, set to watching")
        client.user.setActivity("MSRP", {
            type: "WATCHING"
        });
    }
    client.user.setActivity(base.activity, {
        type: base.type
    });
})

client.on('message', async function(message) {
    let prefix = base.prefix
    if (!message.guild) return;
    if (!prefix) prefix == '>';

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return
    if (!message.member) message.member = message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.content.startsWith(prefix)) {
        let command = client.commands.get(cmd);
        if (!command) return message.reply(`**Either that command is not loaded or not a valid command**`)
        try {
            command.run(client, message, args, base, prefix, manager)
        } catch (e) {
            console.error(error, `Failed to run a command: ${e}`)
            return message.reply(`Failed to run the command, try again.`)
        }
    }
})

client.on('guildMemberAdd', function(member) {
    if (member.guild.id !== "664675799936401419") return;
    let welcometxt = fetch(`PRP.wtxt.${member.guild.id}`)
    if (!welcometxt || welcometxt == undefined) welcometxt = "Welcome to PRP, please look around and enjoy!";
    if (welcometxt.length >= 1024) welcometxt = "Welcome to PRP, please look around and enjoy!";
    let embed = new RichEmbed()
        .setAuthor(`Welcome to PRP`)
        .setColor("RED")
        .setDescription(welcometxt)
    member.send(embed).catch(e => {
        let channelF = member.guild.channels.find(c => c.id === base.welcomeChannel)
        channelF.send(embed)
    })
});

let embed = new RichEmbed()
embed.setColor('RED')
embed.setThumbnail("https://cdn.discordapp.com/attachments/675624191403360328/706718135553884170/PRP.png")
embed.setTimestamp()
embed.setFooter(`Made By IceyyM8 for PRP`)

client.on(`channelDelete`, function(channel) {
    let logc = fetch(`PRP.LogC.${channel.guild.id}`)
    if (logc == undefined) return
    let logger = channel.guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A Channel was deleted`)
    embed.setDescription(`Channel name - ${channel.name}\nChannel ID - ${channel.id}`)
    logger.send(embed)
})

client.on(`guildBanAdd`, function(guild, user) {
    let logc = fetch(`PRP.LogC.${guild.id}`)
    if (logc == undefined) return
    let logger = guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A user was banned!`)
    embed.setDescription(`User's name - ${user.tag}\n**User's ID** - ${user.id}`)
    logger.send(embed)
})

client.on(`guildBanRemove`, function(guild, user) {
    let logc = fetch(`PRP.LogC.${guild.id}`)
    if (logc == undefined) return
    let logger = guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A user was banned!`)
    embed.setDescription(`User's name - ${user.tag}\n**User's ID** - ${user.id}`)
    logger.send(embed)
})

client.on(`guildMemberRemove`, function(guild, user) {
    let logc = fetch(`PRP.LogC.${guild.id}`)
    if (logc == undefined) return
    let logger = guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A user left`)
    embed.setDescription(`User's name - ${user.name}\nUser's ID - ${user.id}`)
    logger.send(embed)
})


client.on(`roleCreate`, function(role) {
    let logc = fetch(`PRP.LogC.${role.guild.id}`)
    if (logc == undefined) return
    let logger = role.guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A role was created`)
    embed.setDescription(`Role name - ${role.name}\nRole color - ${role.hexColor}\nRole Hoist - ${role.hoist}\nPosition - ${role.position}\nRole Perms - ${role.permissions}\nRole ID - ${role.idw}`)
    logger.send(embed)
})

client.on(`roleDelete`, function(role) {
    let logc = fetch(`PRP.LogC.${role.guild.id}`)
    if (logc == undefined) return
    let logger = role.guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A role was created`)
    embed.setDescription(`Role name - ${role.name}\nRole ID - ${role.idw}`)
    logger.send(embed)
})

client.on(`voiceStateUpdate`, function(oldM, newM) {
    let logc = fetch(`PRP.LogC.${newM.guild.id}`)
    if (logc == undefined) return
    let logger = newM.guild.channels.find(c => c.id == logc)
    embed.setAuthor(`A user's voice status was updated`)
    embed.setDescription(`User's Name - ${newM.user.username}\nOld Voice Channel - ${oldM.voiceChannel}\nNew Voice channel - ${newM.voiceChannel}\n\n**Before Change**\nMuted? ${oldM.selfMute}\nDeafened? - ${oldM.selfDeaf}\nStreaming? ${oldM.selfStream}\n\n**After Change**\nMuted? ${newM.selfMute}\nDeafened? - ${newM.selfDeaf}\nStreaming? ${newM.selfStream}`)
    logger.send(embed)
})

client.on('messageDelete', function(message) {
    let logc = fetch(`PRP.LogC.${message.guild.id}`)
    if (logc == undefined) return
    let logger = message.guild.channels.find(c => c.id == logc)

    embed.setAuthor(`A message was deleted`)
    embed.setDescription(`**Deleted Message Info**\n**Message Channel** - <#${message.channel.id}>\n**Message Author** - ${message.author.tag}\n**Message** - ${message.content}\n\n**Message ID** - ${message.id}`)
    logger.send(embed)
})


client.login(base.token)
