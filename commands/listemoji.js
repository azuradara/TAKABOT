const { list } = require('../tkutilities/tkUtil')

module.exports = {
    minArgs: 1,
    maxArgs: 1,
    run(message, args) {
        const emojis = message.guild.emojis.cache.filter(emoji => args[0] === 'animated' ? emoji.animated : !emoji.animated)
        if (!emojis.size) return message.say(`This server has no ${args[0]} custom emoji.`)
        return message.channel.send(emojis.map(emoji => emoji.toString()).sort().join(''), { split: { char: ''} })
    }
}