// import ILeaderboard from '../interface/ILeaderboard';
import TeamsModel from '../database/models/TeamsModel';
import MatcheModel from '../database/models/MatchModel';
import classi from '../utils/learderboardUtils';
import { ITeamsResult } from '../interface/ITeam';

const excludeIdTeams = [{
  model: TeamsModel,
  as: 'teamHome',
  attributes: { exclude: ['id'] },
},
{
  model: TeamsModel,
  as: 'teamAway',
  attributes: { exclude: ['id'] },
}];

class LeaderService {
  matchModel = MatcheModel;
  teamsModel = TeamsModel;

  public classification = async () => {
    const matcheGetAll = await this.matchModel.findAll({
      raw: true,
      where: { inProgress: false },
      include: excludeIdTeams,
    });

    const team = await this.teamsModel.findAll({
      raw: true,
    });

    const resultTeam = team.reduce((acc: ITeamsResult, curr) => {
      const objTeams = acc;
      objTeams[curr.id] = curr.teamName;
      return objTeams;
    }, {});

    // console.log(team);
    // console.log(matcheGetAll);

    const classification = classi.sumTeams(resultTeam, matcheGetAll);

    return classification;
  };
}

export default LeaderService;
