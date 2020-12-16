const Command = require('../../struc/Cmd')
const moment = require('moment')
const { shorten } = require('../../tkutilities/tkUtil')

module.exports = class RemindCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remind',
            aliases: ['alarm','timer','remindme'],
            group: 'reminder',
            memberName: 'remind',
            description: 'Sets a reminder for you.',
            args: [
                {
                    key: 'time',
                    prompt: 'What and when?',
                    type: 'timearg'
                }
            ]
        })
    }

    async run(message, { time }) {
        const exists = await this.client.timers.exists(message.channel.id, message.author.id)
        if (exists) return message.reply('I can only remember one thing at a time haiyaa <a:duckieno:704343789803667507>')
        const timeMins = time.startDate.getTime() - Date.now()
        if ( timeMins > 0x7FFFFFFF) return message.reply('Imma be dead by then <a:duckieno:704343789803667507>')
        const disp = moment().add(timeMins, 'ms').fromNow()
        const timeReason = time.eventTitle ? shorten(time.eventTitle, 500) : 'something'
        await this.client.timers.setTimer(message.channel.id, timeMins, message.author.id, timeReason)
        return message.say(`ai cya ${disp}`)
    }
}