const Redis = require('ioredis')
const { redis_host, redis_pw } = require('../config.json')
const redis = new Redis({
	port: 14829,
	host: redis_host,
	enableReadyCheck: true,
	password: redis_pw,
	db: 0,
})

module.exports = class RedisClient {
	static get db() {
		return redis
	}

	static start() {
		redis.on('connect', () => console.info('[REDIS][CONNECT]: Connecting...'))
		redis.on('ready', () => console.info('[REDIS][READY]: Ready.'))
		redis.on('error', error => console.error(`[REDIS][ERROR]: Ohnae error:\n${error}`))
		redis.on('reconnecting', () => console.warn('[REDIS][RECONNECT]: Reconnecting...'))
	}
}