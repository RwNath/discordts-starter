import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "../../structures/interface";

const serverInfo: Command = {
  data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Affiche des informations sur ce serveur."),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) return;

    const embed = new EmbedBuilder()
      .setColor("#007afc")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setDescription(
        `Ce serveur est **${interaction.guild.name}** et possède **${interaction.guild.memberCount}** membres.`,
      )
      .setThumbnail(interaction.guild.iconURL());

    await interaction.reply({ embeds: [embed] });
  },
};

export default serverInfo;
