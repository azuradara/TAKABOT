const { ArgumentType } = require('discord.js-commando')
const sherlock = require('sherlockjs')

module.exports = class timeArgType extends ArgumentType {
    constructor(client) {
        super(client, 'timearg')
    }

    validate(value) {
        const time = sherlock.parse(value)
        if(!time.startDate) return 'That\'s not a valid time ediot'
        return true
    }

    parse(value) {
        return sherlock.parse(value)
    }
}