"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// Import the custom SuperDoraemonClient class
const SuperDoraemonClient_1 = __importDefault(require("../SuperDoraemonClient"));
module.exports = {
    name: discord_js_1.Events.ClientReady,
    // Set the 'once' property to true, indicating that this event should only be triggered once
    once: true,
    // Function to execute when the ClientReady event is triggered
    execute(client = new SuperDoraemonClient_1.default()) {
        // Log a message to the console indicating the bot's username and tag when it's successfully logged in
        console.log(`Logged in as ${client.user?.tag}!`);
    },
};
//# sourceMappingURL=ready.js.map