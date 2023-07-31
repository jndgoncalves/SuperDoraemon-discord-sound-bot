import { Events } from 'discord.js';
import SuperDoraemonClient from '../SuperDoraemonClient';

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client = new SuperDoraemonClient()) {
    console.log(`Logged in as ${client.user?.tag}!`);
  },
};
