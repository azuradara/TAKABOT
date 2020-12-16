// const Discord = require('discord.js')
// const chandler = require('wokcommands')
// const client = new Discord.Client()
const { Intents, MessageEmbed } = require('discord.js')
const { prefix, token, ownerID, mongodbpath } = require('./config.json')
const path = require('path')

const TakaClient = require('./struc/tkclient')
// const { formatNum } = require('./tkutilities/tkUtil')

const client = new TakaClient({
  owner: ownerID,
  commandPrefix: prefix,
  disableMentions: 'everyone',
})

client.registry
  .registerDefaultTypes()
  .registerTypesIn(path.join(__dirname, 'types'))
  .registerGroups([
    ['random', 'Random'],
    ['analyzers', 'Analyzers'],
    ['util', 'Utility'],
    ['sound', 'Sound'],
    ['text', 'Text']
  ])
  // .registerDefaultCommands({
  //   help: false,
  //   commandState: false,
  //   unknownCommand: false
  // })
  .registerCommandsIn(path.join(__dirname, 'cmds'))

// client.setProvider(
//   MongoClient.connect(mongodbpath)
//     .then((client) => {
//       return new MongoDBProvider(client, 'taka-db')
//     }).catch((err) => {
//       console.error(err)
//     })
// )

// client.on('ready', () => {
//     console.log('高TAKA_client ready!')

//     client.registry
//       .registerDefaultTypes()
//       .registerGroups([
//         ['misc', 'misc commands']
//       ])
//       .registerDefaults()
//       .registerDefaultCommands({
//         help: false,
//         ping: false,
//         commandState: false,
//         unknownCommand: false
//       })
//       .registerTypesIn(path.join(__dirname, 'types'))
//       .registerCommandsIn(path.join(__dirname, 'cmds'))
// })

client.on('ready', async() => {
  client.logger.info(`[READY]高TAKA_client ready.`)

  await client.timers.fetchAll()

  client.setInterval(() => {
    const activity = client.activities[Math.floor(Math.random() * client.activities.length)]
    const text = typeof activity.text === 'function' ? activity.text() : activity.text
    client.user.setActivity(text, { type: activity.type })
  }, 70000)

  if (client.shitPoster) {
    client.setInterval(async () => {
      try {
        const post = await client.shitPoster.fetchRandomPost(false)
        await client.shitPoster.post(post)
      } catch (err) {
        client.logger.error(err)
      }
    }, client.shitPoster.postInterval)
  }
  // Implement command leaderboard Import/Export
})

client.on('guildMemberRemove', async member => {
  if (member.id === client.user.id) return null
  if (member.partial) await member.fetch()
  const channel = member.guild.systemChannel
  if (!channel || !channel.permissionsFor(client.user).has('SEND_MESSAGES')) return null
  if (channel.topic && channel.topic.includes('<taka:disable-leave>')) return null
  try {
    const leaveMessage = client.leaveMessages[Math.floor(Math.random() * client.leaveMessages.length)]
    await channel.send(leaveMessage.replaceAll('{{user}}', `**${member.user.tag}**`))
    return null
  } catch {
    return null
  }
})

client.on('disconnect', event => {
  client.logger.error(`[DISCONNECTED]_/${event.code}.`)
  process.exit(0)
})

client.on('error', err => client.logger.error(err.stack));

client.on('warn', warn => client.logger.warn(warn));

client.on('commandRun', command => {
	if (command.uses === undefined) return;
	command.uses++;
});

client.on('commandError', (command, err) => client.logger.error(`[COMMAND:${command.name}]\n${err.stack}`));


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
