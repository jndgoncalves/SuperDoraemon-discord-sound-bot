import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once('ready', () => {
  console.log('Ready!!!');
});

client.login(process.env.DISCORD_TOKEN);
