const { stripIndents } = require('common-tags');
const request = require('node-superfetch')
const { list } = require('../tkutilities/tkUtil')
const yesnocon = require('../assets/json/yesno.json')
const difficulty = ['easy', 'medium', 'hard']

const resTrue = yesnocon.yes
const resFalse = yesnocon.no

module.exports = {
    aliases: ['quiz'],
    minArgs: 1,
    maxArgs: 1,
    async run(message, args) {
        if (!difficulty.includes(args[0].toLowerCase())) {
            message.reply('Pick a difficulty: easy | medium | hard')
        } else {
            try {
                const { body } = await request
                    .get('https://opentdb.com/api.php')
                    .query({
                        amount: 1,
                        type: 'boolean',
                        encode: 'url3986',
                        difficulty: args[0]
                    })
                if (!body.results) return message.reply("Ohnae, couldn't find a question")
                const correct = decodeURIComponent(body.results[0].correct_answer.toLowerCase())
                const correctBoolean = correct === 'true'
                await message.reply(stripIndents`
                    **You got 15 secs to answer.**
                    ${decodeURIComponent(body.results[0].question)}
                    **[T]rue or [F]alse?**
                `)
                const filter = res => {
                    if (res.author.id !== message.author.id) return false;
                    return resTrue.includes(res.content.toLowerCase()) || resFalse.includes(res.content.toLowerCase())
                }
                const messages = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 15000
                })
                if (!messages.size) return message.reply(`Time's up ediot <:bacLMAO:782377143962304522> It was ${correctBoolean}`)
                const ans = messages.first().content.toLowerCase()
                const ansBool = resTrue.includes(ans)
                if (correctBoolean !== ansBool) return message.reply(`r u retarded <:bacPDeadge:782375944379301900> it's ${correctBoolean}`)
                return message.reply('Verily <:goatedOrenj:773759772519563267> a reward of citrus is in order')
            } catch (err) {
                return message.reply(`Ohnae, \`${err.message}\`.`)
            }
        }
    }
}