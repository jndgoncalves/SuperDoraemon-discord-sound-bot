import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  // Command data defining the name and description of the slash command
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!'),

  // The execute function is called when the command is invoked
  async execute(interaction: CommandInteraction) {
    // Reply to the interaction with user's tag and ID
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  },
};
