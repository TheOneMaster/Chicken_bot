import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { getAccountDetails, getAccountRank } from "../riotAPI/accountDetails";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add an account to the database")
        .addStringOption(option =>
            option.setName("username")
                .setDescription("Account username")
                .setRequired(true)
                .setMaxLength(30)
        )
        .addStringOption(option =>
            option.setName("tag")
                .setDescription("Account tag (everything after the # symbol)")
                .setRequired(true)
                .setMaxLength(8)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const username = interaction.options.getString("username", true);
        const tag = interaction.options.getString("tag", true);

        const details = await getAccountDetails(username, tag);
        const rank = await getAccountRank(details.region, details.puuid);

        await interaction.editReply(`Added account: ${username}#${tag} - ${rank.currenttierpatched} ${rank.ranking_in_tier} MMR`);
    }
}

export default command
