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

    if (!interaction.guild) {
      return await interaction.reply(
        'This command can only be used at Zmikas.'
      );
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: interaction.guild?.voiceAdapterCreator,
    });

    // You can now use the connection object to interact with the voice channel
    // For example, to leave the voice channel after 5 seconds, you can do:
    setTimeout(() => {
      connection.disconnect();
    }, 5000);
  },
};

module.exports = command;
