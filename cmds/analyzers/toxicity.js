const Command = require('../../struc/Cmd')
const request = require('node-superfetch')
const { googlekey } = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = class ToxicityCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'toxicity',
			aliases: ['toxic'],
			group: 'analyzers',
			memberName: 'toxicity',
			description: 'Tells you how much of a bully you are.',
			credit: [
				{
					name: 'Perspective API',
					url: 'https://www.perspectiveapi.com/#/',
					reason: 'API'
				}
			],
			args: [
				{
					key: 'text',
					prompt: 'What text do you want to test the toxicity of?',
					type: 'string'
				}
			]
		});
	}

    async run(message, { text }) {

        try {
            const { body } = await request
                .post('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze')
                .query({ key: googlekey })
                .send({
                    comment: { text },
                    languages: ['en'],
                    requestedAttributes: { SEVERE_TOXICITY: {} }
                })

            const toxicity = Math.round(body.attributeScores.SEVERE_TOXICITY.summaryScore.value*100)
            const toxembed = new MessageEmbed()
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

};