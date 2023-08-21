import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { Command } from './interfaces';

//--REGISTER COMMANDS--
//Run the command deployment script: Run the deploy-commands.ts script using the ts-node command:

//npx ts-node deploy-commands.ts

// Load environment variables from .env file
dotenv.config();

const commands: Command[] = [];
// Grab all the commands files from the commands directory created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

const commandPromises: Promise<void>[] = [];

for (const folder of commandsFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    commandPromises.push(
      import(filePath).then((command) => {
        if ('data' in command && 'execute' in command) {
          commands.push(command.data.toJSON());
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing "data" or "execute" property`
          );
        }
      })
    );
  }
}

// Wait for all command promises to resolve
Promise.all(commandPromises).then(() => {
  // Check if the DISCORD_TOKEN environment variable is set
  if (!process.env.DISCORD_TOKEN) {
    // If the DISCORD_TOKEN is not set, throw an error indicating the missing environment variable
    throw new Error(
      'DISCORD_TOKEN is not defined in the environment variables'
    );
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  // Deploy commands
  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      if (!process.env.CLIENT_ID || !process.env.GUILD_ID) {
        throw new Error(
          'CLIENT_ID or GUILD_ID is not defined in the environment variables'
        );
      }

      // The put method is used to fully refresh all commands in the guild the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: commands }
      );

      if (Array.isArray(data)) {
        console.log(
          `Successfully reloaded ${data.length} application (/) commands.`
        );
      } else {
        console.log('Successfully updated  application commands.');
      }
    } catch (error) {
      // And of course, make sure you catch and log any errors
      console.error(error);
    }

    // Start dummy server to keep the process running for debugging
    console.log('Starting dummy server...');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('http').createServer().listen(3000);
  })();
});
