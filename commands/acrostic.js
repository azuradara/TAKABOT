const words = require('../assets/json/word-list')
const { run } = require('./cat')

module.exports = {
    aliases: ['acro'],
    minArgs: 1,
    maxArgs: 1,
    async run(message, args) {
        if (!/^[A-Z ]+$/i.test(args[0])) {
            message.reply("s'not a word señor")
            return
        }
        word = args[0].toLowerCase().split('')
        const results = []
        for (const letter of word) {
            if (letter === '') {
                results.push(' ');
                continue
            }
            const filteredWords = words.filter(wurd => wurd.startsWith(letter.toLowerCase()))
            const pickedword = filteredWords[Math.floor(Math.random() * filteredWords.length)]
            results.push(`**${letter.toUpperCase()}**${pickedword.slice(1)}`);
        }
        return message.channel.send(results.join('\n'))
    }
}