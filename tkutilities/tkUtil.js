const { stripIndents } = require('common-tags')
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
        return `${arr.slice()}`
    }
}