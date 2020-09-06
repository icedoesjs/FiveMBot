const { query } = require('gamedig');
const {
    success,
    error,
    warning,
    info
} = require('log-symbols');
const { fetch } = require('quick.db')


async function players(client, id, ip) {
    if (id == undefined || !id) return console.error(error, `The player's channel is not set or not found`)
    let chan = client.channels.get(id)
    if (!chan) return console.error(error, `The player's channel is not set or not found`)
    if (!ip || ip == undefined) ip == "69.4.92.90"
    query({
        type: 'fivem',
        host: ip,
        port: '30120',
        maxAttempts: '4'
    }).then((s) => {
        let online = s.players.length;
        let max = s.maxplayers;

        let name = "PRP FiveM: " + online + `/${max}`;
        chan.edit({ name: name })
    }).catch((e) => {
        let ename = "PRP FiveM: Offline";
        chan.edit({ name: ename });
        console.log(error, `Query failed, players channel status set to offline, retrying in 10 seconds`)
    })
}

exports.players = players