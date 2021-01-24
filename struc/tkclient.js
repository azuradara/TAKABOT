const { CommandoClient } = require('discord.js-commando')
// const { WebhookClient } = require('discord.js')
// const fs = require('fs')
// const path = require('path')
const Collection = require('@discordjs/collection')
const activities = require('../assets/json/activity')
const winston = require('winston')
const Redis = require('./Redis')
const timerStruc = require('./TimerStruc')
const ShitposterClient = require('./ShitPoster')
// const subreddits = require('../assets/json/shit')
const {
	POSTER_ID,
	POSTER_TOKEN,
	POSTER_TIME,
	// TAKA_WEBHOOK_ID,
	// TAKA_WEBHOOK_TOKEN,
	// REPORT_CHANNEL_ID,
	// JOIN_LEAVE_CHANNEL_ID,
} = require('../config.json')

module.exports = class TakaClient extends CommandoClient {
	constructor(options) {
		super(options)

		this.logger = winston.createLogger({
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
				winston.format.printf(log => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`),
			),
		})
		this.redis = Redis ? Redis.db : null
		this.timers = new timerStruc(this)
		this.activities = activities
		this.games = new Collection()
		this.shitPoster = POSTER_ID && POSTER_TOKEN ? new ShitposterClient(POSTER_ID, POSTER_TOKEN, {
			subreddits,
			postTypes: ['image', 'rich:video'],
			postInterval: POSTER_TIME,
			disableMentions: 'everyone',
		}) : null
	}
}