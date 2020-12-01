module.exports = {
    aliases: ['cometh', 'comeirl'],
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('whereforth <:bacBipolar:782699871287246880>')
        if (this.client.voice.connections.has(voiceChannel.guild.id)) {
            return message.reply('am already on vc <a:no:725499906453798942>')
        }
        await voiceChannel.join()
        return message.channel.send('<:Speed:758387599504048148>')
    }
}