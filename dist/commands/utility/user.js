"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    // Command data defining the name and description of the slash command
    data: new discord_js_1.SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    // The execute function is called when the command is invoked
    async execute(interaction) {
        // Reply to the interaction with user's tag and ID
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};
//# sourceMappingURL=user.js.map