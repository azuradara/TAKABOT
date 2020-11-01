const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
const roleMessage = require('./role-message')
const roleClaim = require('./role-claim')

client.on('ready', () => {
    console.log('高TAKA_client ready!')
  
    roleClaim(client)

    command(client, 'status', (message) => {
      const content = message.content.replace('!status ', '')
      // "!status hello world" -> "hello world"
  
      client.user.setPresence({
        activity: {
          name: content,
          type: 0,
        },
      })
    })
  })

client.login(process.env.TOKEN)
