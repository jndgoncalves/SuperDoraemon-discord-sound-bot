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
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
//--REGISTER COMMANDS--
//Run the command deployment script: Run the deploy-commands.ts script using the ts-node command:
//npx ts-node deploy-commands.ts
// Load environment variables from .env file
dotenv_1.default.config();
const commands = [];
// Grab all the commands files from the commands directory created earlier
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const commandsFolders = node_fs_1.default.readdirSync(foldersPath);
const commandPromises = [];
for (const folder of commandsFolders) {
    const commandsPath = node_path_1.default.join(foldersPath, folder);
    const commandFiles = node_fs_1.default
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = node_path_1.default.join(commandsPath, file);
        commandPromises.push(Promise.resolve(`${filePath}`).then(s => __importStar(require(s))).then((command) => {
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing "data" or "execute" property`);
            }
        }));
    }
}
// Wait for all command promises to resolve
Promise.all(commandPromises).then(() => {
    // Check if the DISCORD_TOKEN environment variable is set
    if (!process.env.DISCORD_TOKEN) {
        // If the DISCORD_TOKEN is not set, throw an error indicating the missing environment variable
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
        // Start dummy server to keep the process running for debugging
        console.log('Starting dummy server...');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('http').createServer().listen(3000);
    })();
});
//# sourceMappingURL=deploy-commands.js.map