import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface SlashCommand {
    command: SlashCommandBuilder
    execute: (interaction: CommandInteraction) => Promise<void>
}

// Add types for env file
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string
            CLIENT_ID: string
            SERVER_ID: string
        }
    }
}
