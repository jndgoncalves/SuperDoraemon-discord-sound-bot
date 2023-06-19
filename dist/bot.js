"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const SuperDoraemonClient_1 = __importDefault(require("./SuperDoraemonClient"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create a new instance of SuperDoraemonClient
const client = new SuperDoraemonClient_1.default();
// Initialize a new Collection to store commands
client.commands = new discord_js_1.Collection();
// Define the path to the commands folder
const foldersPath = node_path_1.default.join(__dirname, 'commands');
// Read the names of all folders in the commands folder
const commandsFolders = node_fs_1.default.readdirSync(foldersPath);
// Loop over each folder in the commands folder
for (const folder of commandsFolders) {
    // Define the path to the current folder
    const commandsPath = node_path_1.default.join(foldersPath, folder);
    // Read the names of all .ts files in the current folder
    const commandFiles = node_fs_1.default
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.ts'));
    // Loop over each file in the current folder
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    (async () => {
        for (const file of commandFiles) {
            // Define the path to the current file
            const filePath = node_path_1.default.join(commandsPath, file);
            // Import the command from the current file
            const command = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
            // If the command has both a "data" and "execute" property, add it to the commands Collection
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            }
            else {
                // If the command is missing a "data" or "execute" property, log a warning
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
            }
        }
    })();
    // ...
}
// When an interaction is created, try to execute the corresponding command
client.on(discord_js_1.Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
        else {
            interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
});
// When the client is ready, log a message to the console
client.once(discord_js_1.Events.ClientReady, (client) => {
    console.log(`Super Doraemon Bot assembled! Logged in as ${client.user?.tag}`);
});
// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=bot.js.map