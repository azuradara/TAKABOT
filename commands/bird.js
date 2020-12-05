const request = require('node-superfetch')
const config = require('../config.json')
const Discord = require('discord.js')

module.exports = {
    aliases: ['burb'],
    minArgs: 0,
    maxArgs: 0,
    async run(message) {
        // const catEmbed = new Discord.MessageEmbed()
        //     .setColor('#FFFFFF')
        //     .setFooter('TAKA_/高')
        //     .setTimestamp()
        try {
            const { body } = await request
                .get('https://shibe.online/api/birds')
                .query({
                    count: 1,
                    urls:  true,
                    httpsUrls: true
                })
                .set({ 'x-api-key': config.catapikey })
            return message.channel.send({ files: [body[0]] })
        } catch (err) {
            return message.reply(`Ohnae: \`${err.message}\`. What do?`)
        }
    }
}