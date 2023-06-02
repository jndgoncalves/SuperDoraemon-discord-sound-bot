"use strict";
require('dotenv').config(); // Load environment variables from .env file
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const discordToken = process.env.DISCORD_TOKEN;
console.log(process.env.DISCORD_TOKEN, ' TOKEN');
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
    console.log('Ready!');
});
console.log('É desta que vai');
client.login(discordToken);
console.log(discordToken, 'oioioi');
const token = discordToken;
