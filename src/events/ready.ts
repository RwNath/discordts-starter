import { Events, ClientEvents, ActivityType } from "discord.js";
import chalk from "chalk";

export default {
  name: Events.ClientReady,
  async execute(...[client]: ClientEvents[Events.ClientReady]) {
    console.log(
      chalk.black.bgGreenBright(
        `Bot connecté avec le compte ${client.user.tag} !`,
      ),
    );

    client.user.setActivity({
      name: `${client.guilds.cache.size} serveurs`,
      type: ActivityType.Watching,
    });

    // Déploie les commandes en important le fichier "deploy-commands"
    // Note: Idéalement, il faut déployer les commandes uniquement lorsque vous les avez modifier.
    await import("src/deploy-commands");
  },
};
