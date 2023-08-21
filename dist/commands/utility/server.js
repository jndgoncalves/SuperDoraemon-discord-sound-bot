"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    // Command data defining the name and description of the slash command
    data: new discord_js_1.SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    // The execute function is called when the command is invoked
    async execute(interaction) {
        // Reply to the interaction with server's name and member count
        await interaction.reply(`This server tag: is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`);
    },
};
//# sourceMappingURL=server.js.map