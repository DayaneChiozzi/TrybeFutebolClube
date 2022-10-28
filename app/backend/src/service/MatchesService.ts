import QueryString = require('qs');
import MatchModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamsModel';
import TeamsService from './TeamsService';
import IMatch from '../interface/IMatch';

// const criada para incluir no retorno teamHome e teamAway, com o atributo id excluido;
// feito com ajuda da colega Elaine Costa T20-a
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

class MatchesService {
  public matchModel = MatchModel;
  public teamsService: TeamsService;

  public getAll = async (inProgress:
  string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined) => {
    const isVerify = inProgress === 'true' ? 1 : 0;
    if (!inProgress) {
      const matcheGetAll = await this.matchModel.findAll({ include: excludeIdTeams });
      return matcheGetAll;
    }

    const matcheInProgress = await this.matchModel.findAll({
      where: { inProgress: isVerify },
      include: excludeIdTeams,
    });

    return matcheInProgress;
  };

  public create = async (match: IMatch):Promise<IMatch> => {
    const resultCreate = await this.matchModel.create({ ...match, inProgress: true });
    return resultCreate;
  };

  // public updateMatch = async (id:number) => {
  //   const resultUpdateFinish = await this
  //     .matchModel.update({ inProgress: false }, { where: { id } });
  //   return resultUpdateFinish;
  // };
}

export default MatchesService;
