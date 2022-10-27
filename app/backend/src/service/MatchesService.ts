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

  public getAll = async () => {
    const resultModel = await this.matchModel.findAll({ include: excludeIdTeams });
    console.log(resultModel);
    return resultModel;
  };
}

export default MatchesService;
