const Command = require('../../struc/Cmd')
const request = require('node-superfetch')
const { MessageEmbed } = require('discord.js')
const { formatNum } = require('../../tkutilities/tkUtil')
const qsts = require('../../assets/json/gfeud.json')

module.exports = class GFeudCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gfeud',
			group: 'games',
			memberName: 'gfeud',
			description: 'Try to find the top suggestions for a Google search.',
			args: [{
				key: 'question',
				prompt: 'Pick a question to use for the game.',
				type: 'string',
				default: () => qsts[Math.floor(Math.random() * qsts.length)],
			}],
		})
	}

	async run(message, { question }) {
		const crnt = this.client.games.get(message.channel.id)
		if (crnt) return message.reply('Wait until the other game\'s over <a:duckieno:704343789803667507>')
		this.client.games.set(message.channel.id, { name: this.name })
		try {
			const sgsts = await this.fetchSuggestions(question)
			if (!sgsts) return message.say('No results sadge')
			const gdisp = new Array(sgsts.length).fill('???')
			let score = 0
			let attempts = 4
			while (gdisp.includes('???') && attempts) {
				const embed = this.concoctEmbed(question, attempts, sgsts, gdisp)
				await message.embed(embed)
				const messages = await message.channel.awaitMessages(res => res.author.id === message.author.id, {

					max: 1,
					time: 30000,
				})
				if (!messages.size) {
					await message.say('Time\'s up ediot')
					break
				}
				const guess = messages.first().content.toLowerCase()
				if (sgsts.includes(guess)) {
					score += 10000 - (sgsts.indexOf(guess) * 1000)
					gdisp[sgsts.indexOf(guess)] = guess
				}
				else {
					--attempts
				}
			}
			this.client.games.delete(message.channel.id)
			if (!gdisp.includes('???')) {
				return message.say(`Poge he's done it \n **Score Total: $${formatNum(score)}**`)
			}
			const total = this.concoctEmbed(question, attempts, sgsts, sgsts)
			return message.say(`hhh dogshit \n **Score Total: $${formatNum(score)}**`, { embed: total })
		}
		catch (err) {
			this.client.games.delete(message.channel.id)
			return message.reply(`i boofed it \`${err.message}\``)
		}
	}

	async fetchSuggestions(question) {
		const { text } = await request
			.get('https://suggestqueries.google.com/complete/search')
			.query({
				client: 'firefox',
				q: question,
			})
		const sgsts = JSON.parse(text)[1]
			.filter(suggestion => suggestion.toLowerCase() !== question.toLowerCase())
		if (!sgsts.length) return null
		return sgsts.map(suggestion => suggestion.toLowerCase().replace(question.toLowerCase(), '').trim())
	}

	concoctEmbed(question, attempts, sgsts, gdisp) {
		const embed = new MessageEmbed()
			.setColor('#FFFFFF')
			.setTitle(`${question}..?`)
			.setDescription('Type your guess for the suggestions (Without The Question)')
			.setFooter(`TAKA_/高 | ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'} left.`)
		for (let i = 0; i < sgsts.length; i++) {
			const num = formatNum(10000 - (i * 1000))
			embed.addField(`❯❯ ${num}`, gdisp[i], true)
		}
		return embed
	}
}