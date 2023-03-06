import { Client, GatewayIntentBits, EmbedBuilder, Events, TextChannel} from 'discord.js';
//import { token } from './config.json'
const temporary_token:string = "Token";
import { type Handelse } from './dataTypes';
import { readFileSync } from 'fs';
import { join } from 'path';

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,],
 });

// recive info from scraper as racords in a array
const gasque: string = readFileSync(join(__dirname, '../scraper-example/data/natguiden-gasque'), 'utf-8');
const slapp: string = readFileSync(join(__dirname, '../scraper-example/data/natguiden-slapp'), 'utf-8');
const allGasque = JSON.parse(gasque) as Array<Handelse>;
const allSlapp = JSON.parse(slapp) as Array<Handelse>;

console.log(allGasque[2].dateOfEvent);

client.once('ready', () => {
	const general_channel = client.channels.cache.get('1075734034535174176') as TextChannel;
    general_channel.send('Redo att börja festa? Nu är festen här!');

	console.log('Redy to find the party!');
});

// Inväntar command för att uppdatera datan från webscrapern
client.on(Events.InteractionCreate, async (interaction) => {

	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'senast-it') {

		await interaction.reply({ content: "Senaste eventen finns nu i Gasque och Släpp kanalen", ephemeral: true});

		const gasqueChannel = client.channels.cache.get('1082271249742430340') as TextChannel;

		await gasqueChannel.bulkDelete(100, true);

		for (const party of allGasque) {

			const embedMessage = new EmbedBuilder()
                .setTitle(party.heading)
                .setURL(party.URL)
				.setDescription(party.info === ""
								? `Ingen info läs mer: \`${party.URL}\``
								: party.info
				);
			
			await gasqueChannel.send({ embeds: [embedMessage]});

		};

		const slappChannel = client.channels.cache.get('1082271198068613202') as TextChannel;

		await slappChannel.bulkDelete(100, true);

		for (const party of allSlapp) {

			const embedMessage = new EmbedBuilder()
                .setTitle(party.heading)
                .setURL(party.URL)
				.setDescription(party.info === ""
								? `Ingen info läs mer: \`${party.URL}\``
								: party.info
				);
			
			await slappChannel.send({ embeds: [embedMessage]});

		};
	};
});

client.login(temporary_token as string);