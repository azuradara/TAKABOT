const { stripIndents } = require('common-tags')
const { User } = require('discord.js')
const yesnocon = require('../assets/json/yesno.json')
const yes = yesnocon.yes
const no = yesnocon.no

module.exports = class tkUtil {

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static shuffle(array) {
        const arr = array.slice(0)
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr;
    }

    static list(arr, conj = 'and') {
        const len = arr.length;
        if (len === 0) return ''
        if (len === 1) return arr[0]
        return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`
    }

    static list2(arr, conj = 'and') {
        const len = arr.length;
        if (len === 0) return ''
        if (len === 1) return arr[0]
        return `${arr.slice(0, -1).join('\n')}${len > 1 ? `${len > 2 ? '' : ''} ${conj} ` : ''}${arr.slice(-1)}`
    }

    static async tryReact(message, user, emoji, buEmoji) {
        const dm = !message.guild
        if (buEmoji && (!dm && message.channel.permissionsFor(user).has('USE_EXTERNAL_EMOJIS'))) {
            emoji = buEmoji
        }
        if (dm || message.channel.permissionsFor(user).has(['ADD_REACTIONS', 'READ_MESSAGE_HISTORY'])) {
            try {
                await message.react(emoji)
            } catch { return null }
        } return null
    }

    static embedURL(title, url, display) {
        return `[${title}](${url.replaceAll(')', '%29')}${display ? ` "${display}"` : ''})`
    }
}
