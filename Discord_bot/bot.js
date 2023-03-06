const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, CommandInteraction, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const { IT_Event } = require('./dataTypes');
const { readFileSync } = require('node:fs');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
],
 });

//recive info from scraper as racords in a array
const gasque = readFileSync('../scraper-example/data/natguiden-gasque', 'utf-8');
const slapp = readFileSync('../scraper-example/data/natguiden-slapp', 'utf-8');
const allGasque = JSON.parse(gasque);
const allSlapp = JSON.parse(slapp);

console.log(allGasque[2].dateOfEvent);

client.once(Events.ClientReady, () => {
	client.channels.cache.get('1075734034535174176').send('Redo att börja festa? Nu är festen här!');
	console.log('Redy to find the party!');
});

//Inväntar command för att uppdatera datan från webscrapern

client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'senast-it') {

		interaction.reply({ content: "Senaste eventen finns nu i Gasque och Släpp kanalen", ephemeral: true});

		const gasqueChannel = client.channels.cache.get('1082271249742430340');

		await gasqueChannel.bulkDelete(100, true);

		for (party of allGasque) {

			const embedMessage = new EmbedBuilder()
                .setTitle(party.heading)
                .setURL(party.URL)
				.setDescription(party.info === ""
								? `Ingen info läs mer: \`${party.URL}\``
								: party.info
				)
			
			await gasqueChannel.send({ embeds: [embedMessage], ephemeral: true});

		};

		const slappChannel = client.channels.cache.get('1082271198068613202');

		await slappChannel.bulkDelete(100, true);

		for (party of allSlapp) {

			const embedMessage = new EmbedBuilder()
                .setTitle(party.heading)
                .setURL(party.URL)
				.setDescription(party.info === ""
								? `Ingen info läs mer: \`${party.URL}\``
								: party.info
				)
			
			await slappChannel.send({ embeds: [embedMessage], ephemeral: true});

		};
	};
});

client.login(token);