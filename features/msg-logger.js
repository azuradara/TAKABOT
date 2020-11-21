module.exports = (client) => {
    client.on('message', message => {
        console.log(message.content)
    })
}