const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

client.on('ready', () => {
    console.log('TAKA_client ready!')
})

client.login(process.env.TOKEN)