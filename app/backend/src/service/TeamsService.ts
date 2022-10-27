import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../interface/ITeam';

class TeamsService {
  public model = TeamsModel;

  public getAll = async ():Promise<ITeams[]> => {
    const resultModel = await this.model.findAll();
    return resultModel;
  };
}

export default TeamsService;
