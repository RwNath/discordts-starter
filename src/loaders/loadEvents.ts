import { Event } from "@/structures/interface";
import { Client } from "discord.js";
import fs from "node:fs";
import path from "node:path";

// Cette fonction charge les événements
export default async (client: Client) => {
  const eventsPath = path.join(process.cwd(), "dist/events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event: { default: Event } = await import(filePath);
    if (event.default.once) {
      client.once(event.default.name, (...args) =>
        event.default.execute(...args),
      );
    } else {
      client.on(event.default.name, (...args) =>
        event.default.execute(...args),
      );
    }
  }
};
