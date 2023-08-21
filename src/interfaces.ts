import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js';

// Define the Command interface
export interface Command {
  // The data property represents the structure of a slash command
  data: SlashCommandBuilder;

  // The execute method defines the behavior of the command when it's invoked
  // It takes a CommandInteraction as a parameter and returns a promise
  // The promise resolves to an InteractionResponse or undefined
  execute: (
    interaction: CommandInteraction
  ) => Promise<InteractionResponse<boolean> | undefined>;
}
