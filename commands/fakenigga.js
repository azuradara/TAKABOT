const request = require('node-superfetch')
const config = require('../config.json')
const Discord = require('discord.js')

module.exports = {
    aliases: ['ainig'],
    minArgs: 0,
    maxArgs: 0,
    async run(message) {
        const nigEmbed = new Discord.MessageEmbed()
            .setColor('#FF6D2D')
            .setFooter('TAKA_/高')
            .setTimestamp()
        try {
            const { body } = await request.get('https://thispersondoesnotexist.com/image')
            return message.channel.send('dis nigga aint real', { files: [{attachment: body, name:'ai-nig.jpg'}]})
        } catch (err) {
            return message.reply(`Ohnae: \`${err.message}\`. What do?`)
        }
    }
}