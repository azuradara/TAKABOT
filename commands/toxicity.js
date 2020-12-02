const request = require('node-superfetch')
const { googlekey } = require('../config.json')
const Discord = require('discord.js')
const { set } = require('mongoose')

module.exports = {
    aliases: ['toxic'],
    minArgs: 1,
    maxArgs: -1,
    async run(message, args) {

        try {
            const { body } = await request
                .post('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze')
                .query({ key: googlekey })
                .send({
                    comment: { text: args.join(' ')},
                    languages: ['en'],
                    requestedAttributes: { TOXICITY: {} }
                })

            const toxicity = Math.round(body.attributeScores.TOXICITY.summaryScore.value*100)
            const toxembed = new Discord.MessageEmbed()
                .setColor('#ffffff')
                .setFooter('TAKA_/高')
                .setTimestamp()
                .setAuthor(`${toxicity}%`, message.author.displayAvatarURL())

            if (toxicity >= 70) { 
                toxembed
                    .setTitle('wtf toxic')
                    .setThumbnail('https://cdn.discordapp.com/emojis/782375944655863878.png?v=1')
                message.channel.send(toxembed)
                return
            }

            if (toxicity >=40) { 
                toxembed
                    .setTitle('try harder')
                    .setThumbnail('https://cdn.discordapp.com/emojis/782406002321653780.png?v=1')
                message.channel.send(toxembed)
                return
            } else {
                toxembed
                    .setTitle('ah innocence')
                    .setThumbnail('https://cdn.discordapp.com/emojis/766801295125774386.png?v=1')
                message.channel.send(toxembed)
                return
            }

        }catch (err) {
            return message.reply(`Ohnae, \`${err.message}\`.`)
        }
    }
}