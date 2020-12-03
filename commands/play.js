const path = require('path')
var fs = require('fs')
const Discord = require('discord.js')
const { list2, tryReact } = require('../tkutilities/tkUtil')
const sounds = require('../assets/json/sounds_list.json')
const soundList = sounds.map(sound => sound[sound.length - 1].replace(/\.mp3$/, ''))

module.exports = {
    aliases: ['p'],
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "<Sound to play>",
    async run(message, args) {
        const { voice } = message.member
        
        if (args[0] === 'list') {
            const listEmbed = new Discord.MessageEmbed()
                .setFooter('TAKA_/高')
                .setTitle('List of playable sounds:')
                .setDescription(list2(soundList, '\n'))
            message.channel.send(listEmbed)
            return
        }

        if (!voice.channelID) {
            message.reply('get on vc first ediot')
            return
        }

        voice.channel.join().then(async (connection) => {
            connection.play(path.join(__dirname, `../assets/sounds/${args[0]}.mp3`))
            await tryReact(message, this.client.user, '<a:catrave:744314907520139294>')
            return null
        })
    }
    
}