import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  // Command data defining the name and description of the slash command
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),

  // The execute function is called when the command is invoked
  async execute(interaction: CommandInteraction) {
    // Reply to the interaction with server's name and member count
    await interaction.reply(
      `This server tag: is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  },
};
