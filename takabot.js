const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
    console.log('TAKA_client ready!')

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })
})

client.login(process.env.TOKEN)