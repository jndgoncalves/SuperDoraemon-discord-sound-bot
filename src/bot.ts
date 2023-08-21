import dotenv from 'dotenv';
import { Collection } from 'discord.js';
import SuperDoraemonClient from './SuperDoraemonClient';
import path from 'node:path';
import fs from 'node:fs';

// Load environment variables from .env file
dotenv.config();

// Create a new instance of SuperDoraemonClient
const client = new SuperDoraemonClient();

// Initialize a new Collection to store commands
client.commands = new Collection();

// Define the path to the commands folder
const foldersPath = path.join(__dirname, 'commands');

// Read the names of all folders in the commands folder
const commandsFolders = fs.readdirSync(foldersPath);

// Loop over each folder in the commands folder
for (const folder of commandsFolders) {
  // Define the path to the current folder
  const commandsPath = path.join(foldersPath, folder);

  // Read the names of all .ts files in the current folder
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));

  // Loop over each file in the current folder
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  // By using the async IIFE, the code block becomes an async function, allowing the use of the await keyword inside it
  (async () => {
    for (const file of commandFiles) {
      // Define the path to the current file
      const filePath = path.join(commandsPath, file);

      // Import the command from the current file
      const command = await import(filePath);

      //If the command has both a "data" and "execute" property, add it to the commands Collection
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        // If the command is missing a "data" or "execute" property, log a warning
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`
        );
      }
    }
  })();
}

// Define the path to the events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.ts'));

(async () => {
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);

    // Dynamically import the event from the current file
    const event = await import(filePath);

    // Check if the event has a property 'once' set to true
    // If true, the event listener will be triggered only once
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      // If the event does not have the 'once' property or it's set to false
      // The event listener will be triggered every time the event occurs
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);
