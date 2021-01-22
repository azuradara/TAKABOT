const { prefix, token, ownerID } = require('./config.json')
const path = require('path')

const TakaClient = require('./struc/tkclient')

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
    ['text', 'Edit Text'],
    ['reminder', 'Reminder'],
    ['games', 'Games'],
  ])
  .registerCommandsIn(path.join(__dirname, 'cmds'))



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

client.login(token)
