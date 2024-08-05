import { Game } from "../league/league-types";
import { fetchData } from "./reusable-api";

// Function to get the active game
export const getActiveGame = async (gameName: string, tagLine: string): Promise<Game | null> => {
  return await fetchData(`summoners/active-game?gameName=${gameName}&tagLine=${tagLine}`);
};

// Function to get match history
export const getMatchHistory = async (region: string, puuid: string): Promise<any> => {
  return await fetchData('matches/history', { region, puuid });
};

// Function to get summoner stats
export const getSummonerStats = async (region: string, puuid: string) => {
  return await fetchData('summoners/stats', { region, puuid });
};

// Function to get matchup tips
export const getMatchupTips = async (summonerChampion: string, enemyChampion: string) => {
  return await fetchData('champions/matchup', { summonerChampion, enemyChampion });
};
