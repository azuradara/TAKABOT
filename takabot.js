const Discord = require('discord.js')
const client = new Discord.Client()


const config = require('./config.json')
const command = require('./command')
const roleMessage = require('./role-message')

const roleEmbed = new Discord.MessageEmbed()
  .setColor('#FFFFFF')
  .setTitle('Role select')
  .setFooter('TAKA_/高')
  .setDescription('React to an emote to get the role associated with it.\n\nMembership in cut gang is not guaranteed by the role, you must first be judged by the enitrety of the cut gang council on your mettle, and then send a picture of your pp next to a piece of paper with your signature to prove that **The Cut One**:tm: does in fact pertain to you.')
  .AddField("<:amongus:772371006957944842>", "**Among Us**", true)
  .AddField("<:raycon:772371525180325928>", "**Raycon Homies**", true)
  .AddField("✂️", "**Cut Gang**", true);


client.on('ready', () => {
    console.log('TAKA_client ready!')

    roleMessage(client, '772376275544309800', roleEmbed, ['772371006957944842', '772371525180325928', '✂️'])

    command(client, 'status', message => {
        const content = message.content.replace('tk/status ', '')
        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

client.login(process.env.TOKEN)
