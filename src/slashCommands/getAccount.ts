import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
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

        const embedMessage = new EmbedBuilder().setTitle(`Account Details ${region.toUpperCase()}`)
            .setColor(0x0099FF)
            .setAuthor({ name: "Chicken Bot" })
            .setURL("https://github.com/TheOneMaster/Chicken_bot")
            .addFields(
                { name: "Accounts", value: "Lorem Ipsum" }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embedMessage] })

    }
}

export default command
