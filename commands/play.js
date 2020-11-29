const path = require('path')
var fs = require('fs')
const delay = ms => new Promise(res => setTimeout(res, ms))

module.exports = {
    aliases: ['p'],
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "<Sound to play>",
    async run(message, args) {
        const { voice } = message.member
        
        if (!voice.channelID) {
            message.reply('get on vc first ediot')
            return
        }

        if(voice.id === '277757688841240578') {
            message.reply('na <:PeepoIgnore:685675172572692504>')
            await delay(2000);
            message.channel.send('jk <:bachaha:782406002321653780>')
            voice.channel.join().then((connection) => {
                connection.play(path.join(__dirname, `../assets/${args[0]}.mp3`))
            })
            return
        }

        if(voice.id === '332993753629589515') {
            message.reply('we dont fucks with simps round these parts <:PeepoIgnore:685675172572692504>')
            await delay(2000);
            message.channel.send('...')
            await delay(2000)
            message.channel.send('yeah we still dont fucks with simps')
            return
        }

        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname, `../assets/${args[0]}.mp3`))
        })
    }
    
}