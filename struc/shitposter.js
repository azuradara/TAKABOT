const { WebhookClient } = require('discord.js')
const request = require('node-superfetch')
const { embedURL } = require('../tkutilities/tkUtil')

module.exports = class ShitposterClient extends WebhookClient {
    constructor(id, token, options) {
        super(id, token, options)

        this.subreddits = options.subreddits
        this.postTypes = options.postTypes
        this.postInterval = optionsInterval ? Number.parseFloat(options.postInterval) : 3.6e+6
    }

    post(post) {
        const url = embedURL(post.title, `<https://www.reddit.com${post.permalink}>`)
        return this.send(`**r/${post.subreddit}** ${url}\n${post.url}`)
    }

    async fetchRadnomPost(nsfw) {
        const subreddit = this.randomSubreddit()
        const post = await this.fetchRadnomPost(subreddit, nsfw)
        return {
            subreddit,
            title: post.title,
            url: post.url,
            permalink: post.permalink,
            type: post.post_hint,
            nsfw: post.over_18 || false
        }
    }

    async fetchPost(subreddit, nsfw) {
        const { body } = await request
            .get(`https://www.reddit.com/r/${subreddit}/hot.json`)
            .query({ limit: 100})
            
    }
}