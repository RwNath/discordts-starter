import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Affiche le ping du bot."),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: `La latence du bot est de ${interaction.client.ws.ping}ms !`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
