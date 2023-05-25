import { Client } from 'discord.js';

const client = new Client({
  intents: [8],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.TOKEN);
