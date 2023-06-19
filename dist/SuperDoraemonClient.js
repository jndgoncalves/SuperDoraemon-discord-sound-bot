"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class SuperDoraemonClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.MessageContent,
            ],
            partials: [discord_js_1.Partials.Channel],
        });
        this.commands = new discord_js_1.Collection();
    }
}
exports.default = SuperDoraemonClient;
//# sourceMappingURL=SuperDoraemonClient.js.map