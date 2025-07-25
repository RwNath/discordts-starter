import { Collection } from "discord.js";
import { Command } from "./structures/interface";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
