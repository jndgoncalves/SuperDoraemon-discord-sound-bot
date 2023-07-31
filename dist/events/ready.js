"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SuperDoraemonClient_1 = __importDefault(require("../SuperDoraemonClient"));
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client = new SuperDoraemonClient_1.default()) {
        console.log(`Logged in as ${client.user?.tag}!`);
    },
};
//# sourceMappingURL=ready.js.map