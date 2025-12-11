import { Events, ClientEvents, ActivityType } from "discord.js";
import chalk from "chalk";

export default {
  name: Events.ClientReady,
  async execute(...[client]: ClientEvents[Events.ClientReady]) {
    console.log(
      chalk.green(`Bot connecté avec le compte ${client.user.tag} !`)
    );

    client.user.setActivity({
      name: `${client.guilds.cache.size} serveurs`,
      type: ActivityType.Watching,
    });

    await import("src/deploy-commands");
  },
};
