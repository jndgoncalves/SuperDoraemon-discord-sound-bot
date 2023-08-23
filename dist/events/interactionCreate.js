"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// Import the custom SuperDoraemonClient class
const SuperDoraemonClient_1 = __importDefault(require("../SuperDoraemonClient"));
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    // Asynchronous function to execute when the InteractionCreate event is triggered
    async execute(interaction) {
        // Check if the interaction is an instance of CommandInteraction
        // If not, exit the function early
        if (!(interaction instanceof discord_js_1.CommandInteraction))
            return;
        const client = new SuperDoraemonClient_1.default();
        // Retrieve the command from the client's command collection using the command name from the interaction
        const command = client.commands.get(interaction.commandName);
        // If the command is not found, log an error message and exit the function
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        // Try to execute the command
        // If there's an error during execution, catch it and log an error message
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`Error executing ${interaction.commandName}, command: ${error}`);
        }
    },
};
//# sourceMappingURL=interactionCreate.js.map