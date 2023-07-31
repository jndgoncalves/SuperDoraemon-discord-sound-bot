"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a sound'),
    async execute(interaction) {
        // console.log('🚀 ~ file: play.ts:13 ~ execute ~ interaction:', interaction);
        if (!(interaction.member instanceof discord_js_1.GuildMember)) {
            return await interaction.reply('This command can only be used in Zmikas guild.');
        }
        const voiceChannel = interaction.member.voice.channel;
        console.log('🚀 ~ file: play.ts:20 ~ execute ~ voiceChannel:', voiceChannel);
        if (!voiceChannel) {
            console.log('🚀 ~ file: play.ts:25 ~ execute ~ voiceChannel:', voiceChannel);
            return await interaction.reply('Please join a voice channel first.');
        }
        await interaction.reply(`Playing sound...`);
    },
};
module.exports = command;
//# sourceMappingURL=play.js.map