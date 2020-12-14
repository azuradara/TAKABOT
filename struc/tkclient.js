const { CommandoClient } = require('discord.js-commando')
const { WebhookClient } = require('discord.js')
const Collection = require('@discordjs/collection')
const fs = require('fs')
const path = require('path')
const activities = require('../assets/activity')
const winston = require('winston')
const Redis = require('./redis')
const timerStruc = require('./timerStruc')

module.exports = class TakaClient extends CommandoClient {
    constructor(options) {
        super(options)
        
        this.logger = winston.createLogger({
            transports: [new winston.trasports.Console()],
            format: winston.format.combine(
                    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
                    winston.format.printf(log => `[${log.timestamp}] [${log.legel.toUpperCase()}]: ${log.message}`)
            )
        })
        this.redis = Redis ? Redis.db : null
        this.timers = new timerStruc(this)
        this.activities = activities
        
    }
}