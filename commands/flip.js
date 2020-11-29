const Discord = require('discord.js')
const fs = require('fs')
const request = require('request')
const Jimp = require('jimp')


var download = function(uri, filename, callback) {
    request.head(uri, function(err, red, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}



module.exports = {
    aliases: ['flipo'],
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<nigga to flip>',
    async run(message, args) {

        if(!message.mentions.users.first()){
            const tarUrl = message.author.displayAvatarURL()
            download(tarUrl, 'avatar.png', function(){
                
                Jimp.read('./avatar.png').then(function (flipit) {
                    let flippedfile = tarUrl
                    flipit.flip(true, false)
                        .write('./flippedava.png');
                })

                message.channel.send('-', {files: ['avatar.png']})
                message.channel.send('-', {files: ['./flippedava.png']})
            })
        }

        // if(!message.mentions.users.first()){
        //     const url = message.author.displayAvatarURL()
        //     async function download() {
        //         // const filename = Math.floor(Math.random() * Math.floor(7777777))
        //         const respose = await fetch(url)
        //         const buffer = await response.buffer()
        //         fs.writeFile(`../assets/imgs/image.png`, buffer, () => 
        //             console.log('finished downloading!'))
        //     }

        //     message.channel.send('flip', {files: [`../assets/imgs/image.png`]})

        // }else{
        //     const user = message.mentions.users.first()
        //     message.channel.send(user.displayAvatarURL().rotate(180))
        // }

    }
}