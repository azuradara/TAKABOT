const request = require('node-superfetch')
const config = require('../config.json')
const Discord = require('discord.js')

module.exports = {
    aliases: ['cato'],
    minArgs: 0,
    maxArgs: 0,
    async run(message) {
        const catEmbed = new Discord.MessageEmbed()
            .setColor('#FF6D2D')
            .setFooter('TAKA_/高')
            .setTimestamp()
        try {
            const { body } = await request
                .get('https://api.thecatapi.com/v1/images/search')
                .query({
                    limit: 1,
                    mime_types: 'jpg,png'
                })
                .set({ 'x-api-key': config.catapikey })
            return message.channel.send(catEmbed.setImage(body[0].url))
        } catch (err) {
            return message.reply(`Ohnae: \`${err.message}\`. What do?`)
        }
    }
}