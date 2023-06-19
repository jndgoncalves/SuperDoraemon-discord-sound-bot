"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Load environment variables from .env file
dotenv_1.default.config();
const commands = [];
// Grab all the commands files from the commands directory created earlier
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const commandsFolders = node_fs_1.default.readdirSync(foldersPath);
for (const folder of commandsFolders) {
    const commandsPath = node_path_1.default.join(foldersPath, folder);
    const commandFiles = node_fs_1.default
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('ts'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    async () => {
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(commandsPath, file);
            const command = await require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing "data"or "execute" property`);
            }
        }
    };
}
if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not defined in the environment variables');
}
// Construct and prepare an instance of the REST module
const rest = new discord_js_1.REST().setToken(process.env.DISCORD_TOKEN);
// Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        if (!process.env.CLIENT_ID || !process.env.GUILD_ID) {
            throw new Error('CLIENT_ID or GUILD_ID is not defined in the environment variables');
        }
        // The put method is used to fully refresh all commands in the guild the current set
        const data = await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        if (Array.isArray(data)) {
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        }
        else {
            console.log('Successfully updated  application commands.');
        }
    }
    catch (error) {
        // And of course, make sure you catch and log any errors
        console.error(error);
    }
})();
