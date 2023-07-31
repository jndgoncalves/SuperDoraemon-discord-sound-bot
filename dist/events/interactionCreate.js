"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SuperDoraemonClient_1 = __importDefault(require("../SuperDoraemonClient"));
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        // if (!interaction.isChatInput()) return;
        if (!(interaction instanceof discord_js_1.CommandInteraction))
            return;
        const client = new SuperDoraemonClient_1.default();
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`Error executing ${interaction.commandName}, command: ${error}`);
        }
    },
};
//# sourceMappingURL=interactionCreate.js.map