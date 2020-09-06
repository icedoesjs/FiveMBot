async function updateChan(client, id) {
    let channel = client.channels.get(id)
    let members = channel.guild.memberCount;
    return channel.setName(`Discord Members: ${members}`).catch(e => {
        console.log(`Failed to update discord count, maybe a channel not found?`)
    })
}

exports.updateChan = updateChan
