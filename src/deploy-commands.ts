// Ce script charge vos commandes et les déploies à Discord.

import fs from "node:fs";
import path from "node:path";
import {
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import config from "@/config.json";
import { Command } from "@/structures/interface";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

(async () => {
  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command: { default: Command } = await import(filePath);
      if ("data" in command.default && "execute" in command.default) {
        commands.push(command.default.data.toJSON());
      } else {
        console.log(
          `[WARNING] La commande au chemin "${filePath}" n'a pas la propriété "data" ou "execute".`,
        );
      }
    }
  }

  // and deploy your commands!

  try {
    console.log(`Déploiement des ${commands.length} slash commandes.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(config.clientId), {
      body: commands,
    });

    if (!Array.isArray(data)) throw new Error("Data n'est pas une array.");

    console.log(`Les ${data.length} slash commandes ont bien été déployées.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(
      "Une erreur est survenue lors du déploiement des slash commandes",
      error,
    );
  }
})();
