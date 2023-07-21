import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { AppDataSource } from "../data-source";
import { Account } from "../entity/Account";
import { getAccountRank, getPUUIDDetails } from "../riotAPI/accountDetails";
import { Region } from "../riotAPI/types";
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
        const region = interaction.options.getString("region", true) as Region;

        const accounts = await AppDataSource
            .getRepository(Account)
            .findBy({ region: region });

        // console.log(accounts);

        const embeds = await Promise.all(accounts.map(async account => {

            if (account.puuid) {
                const accountDetails = await getPUUIDDetails(account.puuid);
                const rankDetails = await getAccountRank(region, account.puuid);

                const name = accountDetails.name ?? rankDetails.name;
                const tag = accountDetails.tag ?? rankDetails.tag;

                const title = `${name}#${tag}`;

                const playerCard = accountDetails.card?.large;
                const rankIcon = rankDetails.images.large;

                return new EmbedBuilder().setTitle(title)
                    .setURL(`https://tracker.gg/valorant/profile/riot/${name}%23${tag}/overview`)
                    .setColor(0x00ffff)
                    .setThumbnail(playerCard ?? rankIcon ?? null)
                    .addFields([
                        { name: "Username", value: account.accountName, inline: true },
                        { name: "Password", value: account.password, inline: true },
                        { name: "Rank", value: rankDetails.currenttierpatched, inline: true }
                    ])
                    .setFooter({ iconURL: playerCard ? rankIcon : undefined, text: null! })
            }

            return new EmbedBuilder().setColor(0x00ffff)
                .addFields([
                    { name: "Username", value: account.accountName, inline: true },
                    { name: "Password", value: account.password, inline: true },
                ])
        }));

        await interaction.editReply({
            embeds: embeds,
        })

    }
}

export default command
