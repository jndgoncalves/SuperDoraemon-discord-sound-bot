import { Events, CommandInteraction } from 'discord.js';
// Import the custom SuperDoraemonClient class
import SuperDoraemonClient from '../SuperDoraemonClient';

module.exports = {
  name: Events.InteractionCreate,

  // Asynchronous function to execute when the InteractionCreate event is triggered
  async execute(interaction: CommandInteraction) {
    // Check if the interaction is an instance of CommandInteraction
    // If not, exit the function early
    if (!(interaction instanceof CommandInteraction)) return;

    const client = new SuperDoraemonClient();

    // Retrieve the command from the client's command collection using the command name from the interaction
    const command = client.commands.get(interaction.commandName);

    // If the command is not found, log an error message and exit the function
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    // Try to execute the command
    // If there's an error during execution, catch it and log an error message
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `Error executing ${interaction.commandName}, command: ${error}`
      );
    }
  },
};
