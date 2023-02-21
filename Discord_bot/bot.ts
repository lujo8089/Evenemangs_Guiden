import { Pair } from "../../../lib/list";

const { REST, Routes } : any = require('discord.js');

type commands = Pair<String, String>

const commands  = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest: any = new REST({ version: '10' }).setToken('TOKEN');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1075731949127208987'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits }: any = require('discord.js');
const client : any = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login('MTA3NTczMTk0OTEyNzIwODk4Nw.GlD_MP.7NWWQfWkZ3dt2Pf3NEfzVxP-KvU6xyIBCaiVrA');