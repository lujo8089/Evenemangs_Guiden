// import { Pair } from "../../../lib/list";

// type commands = Pair<String, String>

import { REST } from 'discord.js';
import { Routes } from 'discord-api-types/v9';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken('MTA3NTczMTk0OTEyNzIwODk4Nw.GUYTm1.DTl4MRSvxIeg8FmDwRKk7u-UkCilTL4R6iiQws');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1075731949127208987'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();



/*
import { Client, Intents } from 'discord.js';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN_HERE');



import * as Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login('YOUR_DISCORD_BOT_TOKEN_HERE');

*/ 