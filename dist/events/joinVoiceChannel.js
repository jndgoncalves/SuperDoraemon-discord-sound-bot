"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
const audioUtils_1 = require("../utils/audioUtils");
module.exports = {
    name: 'voiceStateUpdate',
    // Asynchronous function to execute when the voiceStateUpdate event is triggered
    async execute(oldState, newState) {
        // Check if the user is not a bot
        // If it's a bot, exit the function early to avoid processing bot voice state changes
        if (newState.member?.user.bot)
            return;
        // Check if the user has joined a voice channel (not just switched channels)
        if (!oldState.channelId && newState.channelId) {
            // Join the voice channel the user has entered
            const connection = (0, voice_1.joinVoiceChannel)({
                channelId: newState.channelId,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator,
            });
            (0, audioUtils_1.playAudio)(connection, './public/sounds/welcome-traveler.mp3');
        }
    },
};
//# sourceMappingURL=joinVoiceChannel.js.map