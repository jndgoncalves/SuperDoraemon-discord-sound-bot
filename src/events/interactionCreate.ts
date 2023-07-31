import { Events, CommandInteraction } from 'discord.js';
import SuperDoraemonClient from '../SuperDoraemonClient';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: CommandInteraction) {
    // if (!interaction.isChatInput()) return;
    if (!(interaction instanceof CommandInteraction)) return;

    const client = new SuperDoraemonClient();

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `Error executing ${interaction.commandName}, command: ${error}`
      );
    }
  },
};
