import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

// import Account from "./slashCommands/account"
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
})


client.login(TOKEN);
