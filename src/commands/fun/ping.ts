import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

module.exports = {
  // Command data defining the name and description of the slash command
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  // The execute function is called when the command is invoked
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
  },
};
