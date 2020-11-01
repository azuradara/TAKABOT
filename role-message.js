const addReactions = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
  if(reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750)
  }
}

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id)

  channel.message.fetch().then((messages) => {
    if (messages.size === 0) {
      channel.send(text).then(message => {
        addReactions(message, reactions)
      })
    } else {
      for (const message of message) {
        message[1].edit(text)
        addReactions(message[1], reactions)
      }
    }
  })
}
