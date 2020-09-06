const { readdirSync } = require('fs');
const { success, error, warning, info } = require('log-symbols');

module.exports = (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'));

        for (let f of commands) {
            let pull = require(`../commands/${dir}/${f}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                let cat = dir.toLocaleUpperCase()
                console.log(success, `[${cat}] Loaded ${f}`)
            } else {
                console.log(error, `${f} failed, missing help.name`);
                continue;
            }
        }
    })
    console.log(info, 'Made by IceyyM8 for PRP')
}
