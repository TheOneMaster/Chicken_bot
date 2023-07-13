import { REST, Routes } from "discord.js";
import "dotenv/config"

import { slashCommands } from "./slashCommands";

const TOKEN = process.env["TOKEN"];
const CLIENT_ID = process.env["CLIENT_ID"];
const SERVER_ID = process.env["SERVER_ID"];


const rest = new REST().setToken(TOKEN);
const commandArray = slashCommands.map(command => command.command.toJSON());

async function deploySlashCommands() {
    try {
        console.log(`Started refreshing ${commandArray.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID),
            { body: commandArray }
        );

        console.log(`Successfully loaded ${commandArray.length} application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
}

deploySlashCommands()
