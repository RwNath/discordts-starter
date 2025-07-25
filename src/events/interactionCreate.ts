import { ClientEvents, Events, MessageFlags } from "discord.js";
import { Command } from "../structures/interface.js";

module.exports = {
  name: Events.InteractionCreate,
  async execute(...[interaction]: ClientEvents[Events.InteractionCreate]) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(
      interaction.commandName,
    ) as Command;

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(
        `Une erreur est survenue en exécutant la commande "${command.data.name}":`,
        error,
      );

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content:
            "Une erreur est survenue lors de l'exécution de la commande !",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content:
            "Une erreur est survenue lors de l'exécution de la commande !",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
