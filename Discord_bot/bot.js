const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, CommandInteraction, EmbedBuilder } = require('discord.js');
const { token } = require('./cofig.json');
const { IT_Event } = require('./dataTypes');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
],
 });

// client.commands = new Collection();
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
// 	const filePath = path.join(commandsPath, file);
// 	const command = require(filePath);
// 	client.commands.set(command.data.name, command);
// }

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

//Inväntar command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'senast-it') {
		const it_channel = client.channels.cache.get('1077948249111015526');

		const embedMessage = new EmbedBuilder()
                .setTitle(IT_Event.heading)
                .setURL(IT_Event.URL)
				.setDescription(IT_Event.info)
				.setTimestamp(IT_Event.dateOfEvent)

		await it_channel.send({ embeds: [embedMessage], ephemeral: true});

		await interaction.reply("Senaste eventen finns nu i it-sektionen");
	}
});

client.login(token);