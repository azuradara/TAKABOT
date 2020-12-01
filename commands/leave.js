module.exports = {
    aliases: ['fuckoff', 'goongit', 'gn'],
    async run(message) {
        const connection = this.client.voice.connections.get(message.guild.id)
        if (!connection) return message.reply('am not even in vc wtf toxic <:bacIgnore:782375944526364753>')
        connection.channel.leave()
        return message.channel.send('<a:Peace:679443513372442637>')
    }
}