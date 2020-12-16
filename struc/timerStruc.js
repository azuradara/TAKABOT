const { MessageEmbed } = require('discord.js')

module.exports = class timerStruc {
    constructor(client) {
        Object.defineProperty(this, 'client', { value : client })

        this.timeouts = new Map()
    }

    async fetchAll() {
        const timers = await this.client.redis.hgetall('timer')
        for (let data of Object.values(timers)) {
            data = JSON.parse(data)
            await this.setTimer(data.channelID, new Date(data.time) - new Date(), data.userID, data.title, false)
        }
        return this
    }
    
    async setTimer(channelID, time, userID, title, updateRedis = true) {
        const data = { time: new Date(Date.now() + time).toISOString(), channelID, userID, title }
        const timeout = setTimeout(async () => {
            try {
                const channel = await this.client.channels.fetch(channelID)
                const reminderEmbed = new MessageEmbed()
                    .setTitle(`s'time ${title}`)
                    .setDescription('Getcho lazy bum up and do the deed')
                    .setThumbnail('https://cdn.discordapp.com/emojis/787872535228317716.png?v=1')
                    .setColor('#FFFFFF')
                    .setFooter('TAKA_/高')
                    .setTimestamp()


                await channel.send(`<@${userID}>`)
                await channel.send(reminderEmbed)
            } finally {
                await this.client.redis.hdel('timer', `${channelID}-${userID}`)
            }
        }, time)
        if (updateRedis) await this.client.redis.hset('timer', { [`${channelID}-${userID}`]: JSON.stringify(data) })
        this.timeouts.set(`${channelID}-${userID}`, timeout)
        return timeout;
    }

    deleteTimer(channelID, userID) {
        clearTimeout(this.timeouts.get(`${channelID}-${userID}`))
        this.timeouts.delete(`${channelID}-${userID}`)
        return this.client.redis.hdel('timer', `${channelID}-${userID}`)
    }

    exists(channelID, userID) {
        return this.client.redis.hexists('timer', `${channelID}-${userID}`)
    }
}