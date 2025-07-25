// Importation de discord.js et des fichiers nécessaires
import { Client, Collection, GatewayIntentBits } from "discord.js";
import config from "./config.json";
import loadCommands from "./loaders/loadCommands";
import loadEvents from "./loaders/loadEvents";

// Création le client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildWebhooks,
  ],
});

// Création de la collection pour contenir les commandes
client.commands = new Collection();

// Charge les commandes & événements
loadCommands(client);
loadEvents(client);

// Connexion à Discord
client.login(config.token);
