const Discord = require('discord.js')
const chandler = require('wokcommands')
const client = new Discord.Client()
const request = require('node-superfetch')



const config = require('./config.json')
const command = require('./command')
const roleMessage = require('./role-message')
const roleClaim = require('./role-claim')

client.on('ready', () => {
    console.log('高TAKA_client ready!')

    new chandler(client, 'commands', 'features')
      .setMongoPath(config.mongodbpath)
  
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

// client.on('message', async(message) => {
//   if (!message.author.bot) {
//     try {
//       const { body } = await request
//         .post('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze')
//         .query({ key: config.googlekey })
//         .send({
//             comment: { text: message.content },
//             languages: ['en'],
//             requestedAttributes: { TOXICITY: {} }
//         })
      
//       const toxicity = Math.round(body.attributeScores.TOXICITY.summaryScore.value*100)
//       if (toxicity >= 85) return message.reply('wtf toxic <:bacDaro:782375944655863878>')
//     } catch (err) {return message.reply(`Ohnae, \`${err.message}\`.`)}
//   }
// })

client.login(config.token)
