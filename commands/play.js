const path = require('path')
var fs = require('fs')

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
        if (args[0] === 'list') {
            var list
            fs.readdir('../assets/', (err, files) => {
                files.forEach(file => {
                    list = file+'\n'
                });
            })
            message.reply(list)
            return
        }
        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname, `../assets/${args[0]}.mp3`))
        })
    }
    
}