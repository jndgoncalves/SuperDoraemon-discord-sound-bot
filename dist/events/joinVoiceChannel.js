"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        // Check if the user is not a bot
        if (newState.member?.user.bot)
            return;
        // Check if the user has joined a voice channel (not just switched channels)
        if (!oldState.channelId && newState.channelId) {
            const connection = (0, voice_1.joinVoiceChannel)({
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
//# sourceMappingURL=joinVoiceChannel.js.map