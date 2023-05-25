import { Client } from 'discord.js';

const client = new Client({
  intents: [8],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login(
  'Njg5NDU4MDMxMjEzNTQzNTU5.GWKjpH.Yr_GNIFXb1GMN_5OhRVjEQjk0K326H1Vm5useo'
);
