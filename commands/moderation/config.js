const { RichEmbed } = require('discord.js');
const {set, fetch, add } = require('quick.db');

module.exports = {
    name: "config",
    category: "moderation",
    description: "Change some options",
    permission: "ADMINISTRATOR",
    example: "config || config [setting-name]",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You do not have permission to execute this`)
        if (args[0]) {
            return setConfig(client, message, args[0])
        } else {
            return sendMenu(client, message)
        }
    }
}

function sendMenu(client, message) {
    let embed = new RichEmbed()
    embed.setAuthor(`PRP Config`)
    embed.setColor(`RED`)
    embed.setDescription(`Please type the highlighted word after the command to enter the prompt`);
    embed.addField(`Config Options`, `**MutedRole** - The ID of the muted role\n**MuteTime** - The time to mute user's if none is supplied\n**ReportChannel** - The channel ID where reports go\n**VerChan** - Sets the verification channel\n**Wtext** - Set the text used in the welcome embed\n**Logchan** - The log channel\n**NotifyRole** - The notifications role\n**StrikeNotifications** - The ID of the strike notif channel`)
    embed.setFooter(`Made by IceyyM8`)
    message.channel.send(embed)
}

function setConfig(client, message, option) {
    option = option.toLowerCase()
    if (option == "mutedrole") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Pleae type the ** ID ** of the muted role `).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let mrole = collected.first().content;
                let find = message.guild.roles.find(r => r.id === mrole)
                if (!mrole) return message.reply(`That dosent seem to be a ** valid ** role!`)
                set(`PRP.mrole.${ message.guild.id}`, mrole)
                message.reply(`The muted role was set to ${find}!`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else if (option == "mutetime") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the ** time ** for user 's to be muted if none is supplied\nEX: 20m.`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let time = collected.first().content;
                set(`PRP.mtime.${message.guild.id}`, time)
                message.reply(`The default muted time was set to **${time}**`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else if (option == "reportchannel") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please input the ID of where reports go to.`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let chanID = collected.first().content;
                let find = message.guild.channels.find(c => c.id == chanID)
                if (!find) return message.reply(`That dosent seem to be a valid channel.`)
                set(`PRP.reportC.${message.guild.id}`, chanID)
                message.reply(`The report channel was set to ${find}`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else if (option == "verchan") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the **ID** of the verification channel!`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let channel = collected.first().content;
                let finder = message.guild.channels.find(c => c.id == channel);
                if (!finder) return message.reply(`That channel was not found.`)
                set(`PRP.vChan.${message.guild.id}`, channel)
                message.channel.send(`Ok, the verification channel was to ${finder}`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else if (option == "wtext") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the message to send when someone joins the **Discord**`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let mssg = collected.first().content;
                if (mssg.length >= 1024) return message.reply(`Please type a message less than **1024** chars.`)
                set(`PRP.wtxt.${message.guild.id}`, mssg)
                message.reply(`Ok, the welcome text was set to **${mssg}**`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit - ${e}`)
            })
        })
    } else if (option == "logchan") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the **ID** of the log channel`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let log = collected.first().content;
                let finder = message.guild.channels.find(c => c.id === log)
                if (!log) return message.reply(`It seems that's not a valid channel`)
                set(`PRP.LogC.${message.guild.id}`, log)
                message.reply(`Ok, the log channel was set to ${finder}`)

            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit - ${e}`)
            })
        })
    } else if (option == "notifyrole") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the **ID** of the notifacation role.`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let rle = collected.first().content;
                let finder = message.guild.roles.find(r => r.id == rle);
                if (!finder) return message.reply(`That role was not found.`)
                set(`PRP.${message.guild.id}.notify`, rle)
                message.channel.send(`Ok, the notification role was set to ${finder}`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else if (option == "strikenotifications") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the **ID** of strike logs channel.`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let chan = collected.first().content;
                let finder = message.guild.channels.find(r => r.id == chan);
                if (!finder) return message.reply(`That channel was not found.`)
                set(`PRP.${message.guild.id}.strikeLogs`, chan)
                message.channel.send(`Ok, the strike channel was set to ${finder}`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else if (option == "strikerole") {
        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`Please type the **ID** of strike role.`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let croleS = collected.first().content;
                let finder = message.guild.roles.find(r => r.id == croleS);
                if (!finder) return message.reply(`That role was not found.`)
                set(`PRP.${message.guild.id}.strikeRole`, croleS)
                message.channel.send(`Ok, the strike role was set to ${finder}`)
            }).catch((e) => {
                message.channel.send(`Im sorry, you didnt send a message within the 30 second time limit `)
            })
        })
    } else {
        message.channel.send(`It seems the option you supplied was not found!`)
    }
}