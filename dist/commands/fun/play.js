"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const command = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a sound'),
    async execute(interaction) {
        // Ensure the command is used in a guild and by a guild member
        if (!(interaction.member instanceof discord_js_1.GuildMember)) {
            return await interaction.reply('This command can only be used in Zmikas guild.');
        }
        // Get the voice channel of the member who used the command
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return await interaction.reply('Please join a voice channel first.');
        }
        await interaction.reply(`Playing sound...`);
        // Ensure the command is used in a guild
        if (!interaction.guild) {
            return await interaction.reply('This command can only be used at Zmikas.');
        }
        // Join the voice channel
        const connection = (0, voice_1.joinVoiceChannel)({
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
//# sourceMappingURL=play.js.map