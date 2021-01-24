const Command = require('../../struc/Cmd')
const dictionary = require('../../assets/json/superscript')
const { letterTrans } = require('custom-translate')

module.exports = class SuperscriptCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'superscript',
			aliases: ['smoltext'],
			group: 'text',
			memberName: 'superscript',
			description: 'Converts text into superscript.',
			args: [
				{
					key: 'text',
					prompt: '<:bacPhone1:782185051172896808>',
					type: 'string',
				},
			],
		})
	}

	run(message, { text }) {
		return message.say(letterTrans(text, dictionary))
	}
}