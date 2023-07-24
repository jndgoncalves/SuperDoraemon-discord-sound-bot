import {
  SlashCommandBuilder,
  CommandInteraction,
  GuildMember,
} from 'discord.js';
import { Command } from '../../interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a sound'),
  async execute(interaction: CommandInteraction) {
    if (!(interaction.member instanceof GuildMember)) {
      return await interaction.reply(
        'This command can only be used in Zmikas guild.'
      );
    }

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return await interaction.reply('Please join a voice channel first.');
    }
    await interaction.reply(`Playing sound...`);
  },
};

module.exports = command;
