import { Command } from "../structures/interface";
import { Client } from "discord.js";
import fs from "node:fs";
import path from "node:path";

// Cette fonction charge les commandes
export default async (client: Client) => {
  const foldersPath = path.join(process.cwd(), "dist/commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command: { default: Command } = await import(filePath);

      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command.default && "execute" in command.default) {
        client.commands.set(command.default.data.name, command.default);
      } else {
        console.warn(
          `[WARNING] La commande au chemin "${filePath}" n'a pas la propriété "data" ou "execute".`,
        );
      }
    }
  }
};
