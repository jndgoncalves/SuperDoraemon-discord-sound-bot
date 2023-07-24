"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a soound'),
    async execute(interaction) {
        await interaction.reply('Played a sound!');
    },
};
//# sourceMappingURL=deploy-commands.js.map