"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const voice_1 = require("@discordjs/voice");
const fs_1 = __importDefault(require("fs"));
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
            const player = (0, voice_1.createAudioPlayer)();
            const resource = (0, voice_1.createAudioResource)(fs_1.default.createReadStream('./public/sounds/zmikas.mp3'));
            connection.subscribe(player);
            player.play(resource);
            player.on(voice_1.AudioPlayerStatus.Idle, () => {
                connection.disconnect();
            });
            // Disconnect after 5 seconds
            // setTimeout(() => {
            //   connection.disconnect();
            // }, 5000);
        }
    },
};
//# sourceMappingURL=joinVoiceChannel.js.map