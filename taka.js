// const Discord = require('discord.js')
// const chandler = require('wokcommands')
// const client = new Discord.Client()

const Commando = require('discord.js-commando')
const { prefix, token, ownerID, mongodbpath } = require('./config.json')
const path = require('path')

const { MongoClient } = require('mongodb')
const MongoDBProvider = require('commando-provider-mongo')

const client = new Commando.CommandoClient({
  owner: ownerID,
  commandPrefix: prefix,
  disableMentions: 'everyone',
})

client.setProvider(
  MongoClient.connect(mongodbpath)
    .then((client) => {
      return new MongoDBProvider(client, 'taka-db')
    }).catch((err) => {
      console.error(err)
    })
)

client.on('ready', () => {
    console.log('高TAKA_client ready!')

    client.registry
      .registerDefaultTypes()
      .registerGroups([
        ['misc', 'misc commands']
      ])
      .registerDefaults()
      .registerDefaultCommands({
        help: false,
        ping: false,
        commandState: false,
        unknownCommand: false
      })
      .registerTypesIn(path.join(__dirname, 'types'))
      .registerCommandsIn(path.join(__dirname, 'cmds'))
})

client.on('disconnect', event => {
  client.logger.error(`[DISCONNECTED]_/${event.code}.`)
  process.exit(0)
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

client.login(token)
