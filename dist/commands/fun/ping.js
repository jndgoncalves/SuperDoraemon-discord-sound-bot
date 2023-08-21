"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    // Command data defining the name and description of the slash command
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    // The execute function is called when the command is invoked
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
//# sourceMappingURL=ping.js.map