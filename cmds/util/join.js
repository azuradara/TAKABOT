const Command = require('../../struc/Cmd')

module.exports = class JoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'join',
			aliases: ['cometh', 'comeirl', 'aji', 'come'],
			group: 'util',
			memberName: 'join',
			description: 'Joins call.',
			guildOnly: true,
			guarded: true,
			userPermissions: ['CONNECT']
		});
	}

	async run(msg) {
		const voiceChannel = msg.member.voice.channel
		if (!voiceChannel) return msg.channel.send('whereforth <:bacBipolar:782699871287246880>')
		if (!voiceChannel.permissionsFor(this.client.user).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL'])) {
			return msg.channel.send('this should never happen.')
		}
		if (!voiceChannel.joinable) return msg.channel.send('filler text im this should never happen')
		if (this.client.voice.connections.has(voiceChannel.guild.id)) {
			return msg.channel.send('am already in vc <a:no:725499906453798942>')
		}
		await voiceChannel.join()
		return msg.channel.send(`<:Speed:758387599504048148> **${voiceChannel.name}**!`)
	}
};