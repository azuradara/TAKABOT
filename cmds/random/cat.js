const Command = require('../../struc/Cmd')
const request = require('node-superfetch')
const { catapikey } = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['cato', 'caot'],
			group: 'random',
			memberName: 'cat',
			description: 'Fetches you a caot',
			clientPermissions: ['ATTACH_FILES'],
			credit: [
				{
					name: 'TheCatAPI',
					url: 'https://thecatapi.com/',
					reason: 'API',
					reasonURL: 'https://docs.thecatapi.com/',
				},
			],
		})
	}

	async run(msg) {
		const catEmbed = new MessageEmbed()
			.setColor('#FFFFFF')
			.setFooter('TAKA_/高')
			.setTimestamp()
		try {
			const { body } = await request
				.get('https://api.thecatapi.com/v1/images/search')
				.query({
					limit: 1,
					mime_types: 'jpg,png',
				})
				.set({ 'x-api-key': catapikey })
			return msg.channel.send(catEmbed.setImage(body[0].url))
		}
		catch (err) {
			return msg.reply(`Ohnae: \`${err.message}\`. What do?`)
		}
	}
}
