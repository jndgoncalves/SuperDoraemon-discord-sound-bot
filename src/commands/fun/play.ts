import {
  SlashCommandBuilder,
  CommandInteraction,
  GuildMember,
} from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { Command } from '../../interfaces';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a sound'),
  async execute(interaction: CommandInteraction) {
    // Ensure the command is used in a guild and by a guild member
    if (!(interaction.member instanceof GuildMember)) {
      return await interaction.reply(
        'This command can only be used in the specified Guild.'
      );
    }

    // Get the voice channel of the member who used the command
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return await interaction.reply('Please join a voice channel first.');
    }
    await interaction.reply(`Playing sound...`);

    // Ensure the command is used in a guild
    if (!interaction.guild) {
      return await interaction.reply(
        'This command can only be used at specified Guild.'
      );
    }

    // Join the voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: interaction.guild?.voiceAdapterCreator,
    });

    // Disconnect from the voice channel after 5 seconds
    setTimeout(() => {
      connection.disconnect();
    }, 5000);
  },
};

module.exports = command;
