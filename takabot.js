const Discord = require('discord.js')
const WOKCommands = require('wokcommands')

const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
const roleMessage = require('./role-message')
const roleClaim = require('./role-claim')

client.on('ready', () => {
    console.log('高TAKA_client ready!')
  
    new WOKCommands(client, 'commands', 'features')
      .setPrefix('~')
      .setMongoPath('mongodb+srv://TAKAbot:Ur9BAtbqbcpy6JUt@cluster0.1rpzf.mongodb.net/taka-db?retryWrites=true&w=majority')

    roleClaim(client)

    command(client, 'status', (message) => {
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
