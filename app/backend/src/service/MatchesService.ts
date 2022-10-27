import QueryString = require('qs');
import MatchModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamsModel';

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
  // public teamsService: TeamsService;

  public getAll = async (inProgress:
  string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined) => {
    if (!inProgress) {
      const matcheGetAll = await this.matchModel.findAll({ include: excludeIdTeams });
      return matcheGetAll;
    }

    const isVerify = inProgress === 'true' ? 1 : 0;

    const matcheInProgress = await this.matchModel.findAll({
      where: { inProgress: isVerify },
      include: excludeIdTeams,
    });

    return matcheInProgress;
  };
}

export default MatchesService;
