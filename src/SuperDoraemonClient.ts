import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

export default class SuperDoraemonClient extends Client {
  public commands: Collection<string, never>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel],
    });
    this.commands = new Collection();
  }
}
