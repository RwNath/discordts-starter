import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../structures/interface";

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Affiche le ping du bot."),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(
      `La latence du bot est de ${interaction.client.ws.ping}ms !`,
    );
  },
};

export default pingCommand;
