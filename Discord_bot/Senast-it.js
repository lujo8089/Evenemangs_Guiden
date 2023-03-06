const { SlashCommandBuilder, Client, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const { IT_Event } = require('../dataTypes');
const { clientId, guildId, token } = require('../cofig.json');

const client = new Client({ 
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
 });

module.exports = {
    data: new SlashCommandBuilder()
      .setName('senast-it')
      .setDescription('Returns the latest event published by IT-Sektionen'),
    async execute(interaction) {

        const it_channel = client.channels.get('1077948249111015526');

        const embedMessage = new EmbedBuilder()
                .setTitle(IT_Event.heading)
                .setURL(IT_Event.URL)

        await it_channel.send({embeds: [embedMessage], ephemeral: true});
    }
  };


// const embed = new EmbedBuilder()
// .setColor(0x0099FF)
// .setTitle(IT_Event.heading)
// .setURL(IT_Event.URL)
// .setAuthor({name: IT_Event.host})
// .setDescription(IT_Event.info)
// .setTimestamp(IT_Event.dateOfPublish)
// .setImage('https://images.app.goo.gl/oR1CEZVWFXa4nbkT6');
  