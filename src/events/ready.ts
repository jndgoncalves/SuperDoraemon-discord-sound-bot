import { Events } from 'discord.js';
// Import the custom SuperDoraemonClient class
import SuperDoraemonClient from '../SuperDoraemonClient';

module.exports = {
  name: Events.ClientReady,
  // Set the 'once' property to true, indicating that this event should only be triggered once
  once: true,
  // Function to execute when the ClientReady event is triggered
  execute(client = new SuperDoraemonClient()) {
    // Log a message to the console indicating the bot's username and tag when it's successfully logged in
    console.log(`Logged in as ${client.user?.tag}!`);
  },
};
