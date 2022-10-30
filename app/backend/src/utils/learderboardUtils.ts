// import { ITeams } from '../interface/ITeam';
import { ITeamsResult } from '../interface/ITeam';
import ILeaderboard from '../interface/ILeaderboard';
import IMatch from '../interface/IMatch';

function totalGoals(homeTeamGoals: number, awayTeamGoals:number) {
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  goalsFavor += homeTeamGoals;
  goalsOwn += awayTeamGoals;
  goalsBalance = goalsFavor - goalsOwn;
  return {
    goalsFavor,
    goalsOwn,
    goalsBalance,
  };
}

function points(homeTeamGols: number, awayTeamGols: number) {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  if (homeTeamGols > awayTeamGols) {
    totalVictories += 1;
    totalPoints += 3;
  }
  if (homeTeamGols === awayTeamGols) {
    totalPoints += 1;
    totalDraws += 1;
  }
  return {
    totalPoints,
    totalGames: 1,
    totalVictories,
    totalDraws,
  };
}
function losses(homeTeamGols: number, awayTeamGols: number) {
  let totalLosses = 0;
  if (homeTeamGols < awayTeamGols) {
    totalLosses += 1;
  }
  return {
    totalLosses,
  };
}

function calculate(
  nameTeam: number | string,
  homeTeamGoals: number,
  awayTeamGoals: number,
):ILeaderboard {
  const goals = totalGoals(homeTeamGoals, awayTeamGoals);
  const totalPoints = points(homeTeamGoals, awayTeamGoals);
  const totalLosses = losses(homeTeamGoals, awayTeamGoals);

  return {
    name: nameTeam,
    ...totalPoints,
    ...totalLosses,
    ...goals,
    efficiency: 0,
  };
}

const createPropsClassification = (
  teams: ITeamsResult,
  matches: IMatch[],
): ILeaderboard[] => matches
  .map((value) => calculate(teams[value.homeTeam], value.homeTeamGoals, value.awayTeamGoals));

function sumGolsBalance(goalsFavor: number, goalsOwn: number): number {
  return goalsFavor - goalsOwn;
}

function efficiency(totalPoints: number, totalGames: number): number {
  const result = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return parseFloat(result);
}

function sortRepetTeam(acc: ILeaderboard[]): ILeaderboard[] {
  return acc
    .sort((a, b) => a.goalsOwn - b.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints);
}

function sumRepetTeams(classification: ILeaderboard[]): ILeaderboard[] {
  return classification.reduce((acc: ILeaderboard[], curr: ILeaderboard) => {
    const nome = curr.name;
    const reaptTeam = acc.find((elem: ILeaderboard) => elem.name === nome);
    if (reaptTeam) {
      reaptTeam.totalPoints += curr.totalPoints;
      reaptTeam.totalGames += 1;
      reaptTeam.totalVictories += curr.totalVictories;
      reaptTeam.totalDraws += curr.totalDraws;
      reaptTeam.totalLosses += curr.totalLosses;
      reaptTeam.goalsFavor += curr.goalsFavor;
      reaptTeam.goalsOwn += curr.goalsOwn;
      reaptTeam.goalsBalance = sumGolsBalance(reaptTeam.goalsFavor, reaptTeam.goalsOwn);
      reaptTeam.efficiency = efficiency(reaptTeam.totalPoints, reaptTeam.totalGames);
    } else {
      acc.push(curr);
    }
    return sortRepetTeam(acc);
  }, []);
}

function sumTeams(teams: ITeamsResult, matches: IMatch[]): ILeaderboard[] {
  const classification: ILeaderboard[] = createPropsClassification(teams, matches);
  return sumRepetTeams(classification);
}

export default { createPropsClassification, sumTeams };
