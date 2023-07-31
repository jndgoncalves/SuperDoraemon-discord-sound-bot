import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { Command } from './interfaces';

export default class SuperDoraemonClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
      partials: [Partials.Channel],
    });
    this.commands = new Collection();
  }
}
