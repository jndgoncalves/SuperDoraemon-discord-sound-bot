"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playAudio = void 0;
const voice_1 = require("@discordjs/voice");
const fs_1 = __importDefault(require("fs"));
function playAudio(voiceConnection, audioPath) {
    if (!voiceConnection) {
        console.log('No voice connection');
        return;
    }
    // Create a new audio player instance
    const player = (0, voice_1.createAudioPlayer)();
    // Create an audio resource from the specified MP3 file using a readable stream
    const resource = (0, voice_1.createAudioResource)(fs_1.default.createReadStream(audioPath));
    // Subscribe the connection to the audio player, allowing audio to be played in the voice channel
    voiceConnection.subscribe(player);
    player.play(resource);
    // Listen for the 'Idle' event on the audio player, which indicates that audio playback has finished
    player.on(voice_1.AudioPlayerStatus.Idle, () => {
        voiceConnection.disconnect();
    });
}
exports.playAudio = playAudio;
//# sourceMappingURL=audioUtils.js.map