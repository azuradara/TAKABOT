const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
    console.log('TAKA_client ready!')

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    command(client, 'status', message => {
        const content = message.content.replace('tk/status ', '')
        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

client.login(process.env.TOKEN)