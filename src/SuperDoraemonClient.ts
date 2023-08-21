import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
// Import the Command interface
import { Command } from './interfaces';

// Define the SuperDoraemonClient class that extends the Client class from discord.js
export default class SuperDoraemonClient extends Client {
  // Declare a public property 'commands' which is a collection of commands
  public commands: Collection<string, Command>;

  // Constructor for the SuperDoraemonClient class
  constructor() {
    // Call the constructor of the parent Client class
    super({
      // Define the intents the bot needs to function properly
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
      // Specify the partials the bot should handle, in this case, channels
      partials: [Partials.Channel],
    });

    // Initialize the commands collection
    this.commands = new Collection();
  }
}
