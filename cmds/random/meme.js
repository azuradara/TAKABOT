const SubredditCommand = require('../../struc/Subreddit')
const { list } = require('../../tkutilities/tkUtil')
const subreddits = require('../../assets/json/shit.json')

module.exports = class MemeCommand extends SubredditCommand {
	constructor(client) {
		super(client, {
			name: 'meme',
			group: 'random',
			memberName: 'meme',
			description: 'random meme from a random sub',
			postType: 'image',
			getIcon: true,
			args: [
				{
					key: 'subreddit',
					prompt: `What sub do you wanna query? ${list(subreddits, 'or')}`,
					type: 'string',
					oneOf: subreddits,
					default: () => subreddits[Math.floor(Math.random() * subreddits.length)],
					parse: subreddit => subreddit.toLowerCase(),
				},
			],
		})
	}

	genTxt(post, subreddit, icon) {
		return this.crEmbed(post, subreddit, icon)
	}
}