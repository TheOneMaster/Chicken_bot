import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface SlashCommand {
    command: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>

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
