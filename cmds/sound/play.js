const Command = require('../../struc/Cmd')
const path = require('path')
const { list2, tryReact } = require('../../tkutilities/tkUtil')
const sounds = require('../../assets/json/sounds_list.json')
const pickedSound = sounds.map(sound => sound[sound.length - 1].replace(/\.mp3$/, ''))
const { MessageEmbed } = require('discord.js')

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'sound',
            memberName: 'play',
            description: 'Plays a sound in call.',
            detauls: `**Sounds:** ${pickedSound.join(', ')}`,
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 2
            },
            userPermissions: ['CONNECT', 'SPEAK'],
            args: [
                {
                    key: 'sound',
                    prompt: `Pick a sound ediot <a:bacHaha:425834071076241429> ${list2(pickedSound, 'or')}`,
                    type: 'string',
                    validate: sound => {
                        const picked = sound.toLowerCase().replace(/ /g, '-')   
                        if (pickedSound.includes(picked)) return true
                        return listEmbed
                    },
                    parse: sound => {
                        const picked = sound.toLowerCase().replace(/ /g, '-')
                        return sounds.find(snd => snd.includes(`${picked}.mp3`))
                    }
                }
            ]
        })
    }

    async run(message, { sound }) {
        const connection = this.client.voice.connections.get(message.guild.id)
        if (!connection) {
            return message.channel.send(`Can I come to call first <a:no:725499906453798942>`)
        }
        connection.play(path.join(__dirname, '..', '..', 'assets', 'sounds', ...sound))
        await tryReact(message, this.client.user, '<a:catrave:744314907520139294>')
        return null
    }
}