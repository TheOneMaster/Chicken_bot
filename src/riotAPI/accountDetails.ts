import { AccountDetails, RankDetails, Region } from "./types";

const API_URL = "https://api.henrikdev.xyz";

export async function getAccountDetails(username: string, tag: string) {
    const getUrl = `${API_URL}/valorant/v1/account/${username}/${tag}`;

    const details = await fetch(getUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Exclude-Invalid": "true",
        }
    });

    const jsonData = await details.json();
    return jsonData.data as AccountDetails
}

async function getPUUIDDetails(puuid: string) {

}

export async function getAccountRank(region: Region, puuid: string) {
    const getUrl = `${API_URL}/valorant/v1/by-puuid/mmr/${region}/${puuid}`;

    const rank = await fetch(getUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Exclude-Invalid": "true",
        }
    });

    const jsonData = await rank.json();
    return jsonData.data as RankDetails
}
