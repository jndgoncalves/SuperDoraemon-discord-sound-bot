import { VoiceState } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState: VoiceState, newState: VoiceState) {
    // Check if the user is not a bot
    if (newState.member?.user.bot) return;

    // Check if the user has joined a voice channel (not just switched channels)
    if (!oldState.channelId && newState.channelId) {
      const connection = joinVoiceChannel({
        channelId: newState.channelId,
        guildId: newState.guild.id,
        adapterCreator: newState.guild.voiceAdapterCreator,
      });

      // Disconnect after 5 seconds
      setTimeout(() => {
        connection.disconnect();
      }, 5000);
    }
  },
};
