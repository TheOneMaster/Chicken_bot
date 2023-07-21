import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";

// import Account from "./slashCommands/account"
import { AppDataSource } from "./data-source";
import { slashCommands } from "./slashCommands";

const TOKEN = process.env["TOKEN"];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready!Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = slashCommands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  await command.execute(interaction);

  return;
});

async function main() {
  await AppDataSource.initialize();

  console.log("Connected to the database");

  client.login(TOKEN);
}

main();
