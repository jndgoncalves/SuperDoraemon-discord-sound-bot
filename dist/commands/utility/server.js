"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction) {
        await interaction.reply(`This server tag: is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`);
    },
};
//# sourceMappingURL=server.js.map