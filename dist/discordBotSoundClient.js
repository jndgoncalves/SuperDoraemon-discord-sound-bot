"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// Define the discordBotSoundClient class that extends the Client class from discord.js
class discordBotSoundClient extends discord_js_1.Client {
    // Constructor for the SuperDoraemonClient class
    constructor() {
        // Call the constructor of the parent Client class
        super({
            // Define the intents the bot needs to function properly
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildVoiceStates,
            ],
            // Specify the partials the bot should handle, in this case, channels
            partials: [discord_js_1.Partials.Channel],
        });
        // Initialize the commands collection
        this.commands = new discord_js_1.Collection();
    }
}
exports.default = discordBotSoundClient;
//# sourceMappingURL=discordBotSoundClient.js.map