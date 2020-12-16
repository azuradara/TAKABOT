const Command = require('../../struc/Cmd')

module.exports = class DeleteReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'killremind',
			aliases: ['killtimer', 'removetimer', 'removealarm', 'killalarm', 'killtimer'],
			group: 'reminder',
			memberName: 'killremind',
			description: 'Forgets a thing'
		});
	}

	async run(msg) {
		const exists = await this.client.timers.exists(msg.channel.id, msg.author.id);
		if (!exists) return msg.reply('You have a timer? <:bacHatena:782185051047723008>');
		await this.client.timers.deleteTimer(msg.channel.id, msg.author.id);
		return msg.say('ai i guess <:bacIgnore:782375944526364753>');
	}
};