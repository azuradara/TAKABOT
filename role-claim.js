const roleMessage = require('./role-message')
const Discord = require('discord.js')

module.exports = client => {
    const channelId = '772376275544309800'

    const getEmoji = emojiName => client.emojis.cache.find((emoji) => emoji.name === emojiName)

    const emojis = {
        amongus: 'Among Us',
        raycon: 'Raycon Homies',
        cutgang: 'Cut Gang',
        popoga: 'Uncut Gang'
    }

    const reactions = []

    let emojiText = new Discord.MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle('Role select')
        .setFooter('TAKA_/高')
        .setDescription('React to an emote to get the role associated with it.\n\nMembership in cut gang is not guaranteed by the role, you must first be judged by the enitrety of the cut gang council on your mettle, and then send a picture of your pp next to a piece of paper with your signature to prove that **The Cut One**:tm: does in fact pertain to you.')


    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText.addField(emoji, role, false)
    }

    roleMessage(client, channelId, emojiText, reactions)

    const handleReaction = (reaction, user, add) => {
      if (user.id === '723819104045105172') {
        return
      }
  
      const emoji = reaction._emoji.name
  
      const { guild } = reaction.message
  
      const roleName = emojis[emoji]
      if (!roleName) {
        return
      }
  
      const role = guild.roles.cache.find((role) => role.name === roleName)
      const member = guild.members.cache.find((member) => member.id === user.id)
  
      if (add) {
        member.roles.add(role)
      } else {
        member.roles.remove(role)
      }
    }
  
    client.on('messageReactionAdd', (reaction, user) => {
      if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, true)
      }
    })
  
    client.on('messageReactionRemove', (reaction, user) => {
      if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, false)
      }
    })
  }  