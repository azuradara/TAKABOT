const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
new token = process.env.TOKEN

client.on('ready', () => {
    console.log('TAKA_client ready!')

    command(client, 'ping', message => {
        message.channel.send('Pong!')
    })
})

client.login(process.env.TOKEN)