const Command = require('../../struc/Cmd')

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			aliases: ['goaway', 'fuckoff'],
			group: 'util',
			memberName: 'leave',
			description: 'sadge',
			guildOnly: true,
			guarded: true,
			userPermissions: ['MOVE_MEMBERS']
		});
	}

	run(msg) {
		const connection = this.client.voice.connections.get(msg.guild.id)
		if (!connection) return msg.channel.send('am not even in vc wtf toxic <:bacIgnore:782375944526364753>')
		connection.channel.leave()
		return msg.channel.send('<a:Peace:679443513372442637>')
	}
};