# Super Doraemon - Discord Sound Bot

A Discord bot designed to join a voice channel that a user has joined and play a specific sound. This bot enhances server interactions by providing a fun and interactive audio experience for users.

### Demonstration Video

Click on the image below to watch a demonstration of the Discord bot on YouTube:

[![Watch the video](https://img.youtube.com/vi/z3NlAQ4b2Fc/maxresdefault.jpg)](https://www.youtube.com/watch?v=z3NlAQ4b2Fc)

## Table of Contents

- [Development & Configuration](#development--configuration)
- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Commands](#commands)
- [Events](#events)
- [Dependencies](#dependencies)
- [Debugging with VS Code](#debugging-with-vs-code)
- [Contribution & Feedback](#contribution--feedback)
- [License](#license)
- [Contact](#contact)

## Development & Configuration

- **TypeScript**: The bot is written in TypeScript, offering strong typing and OOP features.
- **ESLint**: The code is linted using ESLint to ensure code quality and consistency.
- **VS Code**: For developers using Visual Studio Code, there are specific configurations provided for a seamless development experience.

## Features

- **Join & Play**: The bot automatically joins a voice channel when a user joins and plays a designated sound.
- **Interactive Commands**: Engage users with commands to control the bot's behavior.

## Setup & Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jndgoncalves/discord-bot.git
   ```

2. **Navigate to the Directory**

   ```bash
   cd discord-bot
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Setup Environment Variables**
   Rename `.env.example` to `.env` and fill in the required variables, such as your Discord token and any other necessary configurations.

5. **Run the Bot**
   ```bash
   docker-compose up
   ```

## Commands

### Fun Commands

- `!ping`: Checks the bot's responsiveness.
- `!play`: Outputs "playing a sound..." in the text channel. (Note: This command was created as a test before implementing the event-based sound playing feature.)

### Utility Commands

- `!server`: Provides server information (name and total members).
- `!user`: Provides information about the invoking user (tag and unique ID).

## Events Handled

- **ready**: Initializes the bot and logs a message to the console.
- **interactionCreate**: Processes user interactions with server commands.
- **joinVoiceChannel**: Handles users joining voice channels, triggering bot actions.

## Dependencies

- **Discord.js**: Interact with the Discord API.
- **@discordjs/voice**: Handle voice connections in Discord.js.
- **dotenv**: Load environment variables from `.env`.
- **ts-node**: TypeScript execution for Node.js.
- **ffmpeg**: Handle multimedia data for audio playback in voice channels.

### DevDependencies

- **@typescript-eslint/eslint-plugin** and **@typescript-eslint/parser**: ESLint support for TypeScript.
- **eslint**: Lint ECMAScript/JavaScript code.
- **nodemon**: Monitor source changes and restart the server.
- **typescript**: Static types for JavaScript development.

## Debugging with VS Code

1. **Update docker-compose.yml**: Modify for debugging.
2. **Build and Start the Container**:

   ```bash
   docker-compose up
   ```

3. **Debug using VS Code**: Attach VS Code to the running Node.js process inside the container.

## Contribution & Feedback

Contributions are welcome! Fork the repository and submit a pull request for enhancements or fixes. For feedback or issues, use the GitHub issues section.

## License

This project is licensed under the MIT License.

## Contact

For inquiries or collaboration opportunities, reach out via GitHub issues or your preferred contact method.
