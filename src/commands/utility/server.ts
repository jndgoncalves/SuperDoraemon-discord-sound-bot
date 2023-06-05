import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply(
      `This server tag: is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  },
};
