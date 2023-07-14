import { SlashCommandBuilder, bold, underscore } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("account")
        .setDescription("Returns a list of accounts from a region")
        .addStringOption(option => {
            return option.setName("region")
                .setDescription("Region for the account")
                .setRequired(true)
                .addChoices(
                    { name: "EU", value: "eu" },
                    { name: "NA", value: "na" },
                    { name: "AP", value: "ap" }
                );
        }),
    async execute(interaction) {
        await interaction.deferReply();

        const { user } = interaction;
        const region = interaction.options.getString("region", true);

        const header = underscore(bold(`Account Details (${region.toUpperCase()})`));

        const finalMessage = `${header}
        1. Lorem Ipsum
        2. Dolor Sit Amet`;

        await interaction.editReply(finalMessage)

    }
}

export default command
