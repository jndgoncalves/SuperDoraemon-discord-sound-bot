import { VoiceState } from 'discord.js';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import fs from 'fs';

module.exports = {
  name: 'voiceStateUpdate',
  // Asynchronous function to execute when the voiceStateUpdate event is triggered
  async execute(oldState: VoiceState, newState: VoiceState) {
    // Check if the user is not a bot
    // If it's a bot, exit the function early to avoid processing bot voice state changes
    if (newState.member?.user.bot) return;

    // Check if the user has joined a voice channel (not just switched channels)
    if (!oldState.channelId && newState.channelId) {
      // Join the voice channel the user has entered
      const connection = joinVoiceChannel({
        channelId: newState.channelId,
        guildId: newState.guild.id,
        adapterCreator: newState.guild.voiceAdapterCreator,
      });

      // Create a new audio player instance
      const player = createAudioPlayer();
      // Create an audio resource from the specified MP3 file using a readable stream
      const resource = createAudioResource(
        fs.createReadStream('./public/sounds/welcome-traveler.mp3')
      );

      // Subscribe the connection to the audio player, allowing audio to be played in the voice channel
      connection.subscribe(player);
      player.play(resource);

      // Listen for the 'Idle' event on the audio player, which indicates that audio playback has finished
      player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect();
      });

      // Disconnect after 5 seconds
      // setTimeout(() => {
      //   connection.disconnect();
      // }, 5000);
    }
  },
};
