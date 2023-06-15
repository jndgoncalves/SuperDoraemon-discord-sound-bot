import fs from "node:fs";
import path from "node:path";


const commands = [];
// Grab all the commands files from the commands directory created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for(const folder of commandsFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('ts'));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandsPath)
    
}