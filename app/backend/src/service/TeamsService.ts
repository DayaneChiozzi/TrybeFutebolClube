import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../interface/ITeam';

class TeamsService {
  public model = TeamsModel;

  public getAll = async ():Promise<ITeams[]> => {
    const resultModel = await this.model.findAll();
    return resultModel;
  };

  public getByPk = async (id:number):Promise<ITeams> => {
    const resultTeamsId = await this.model.findByPk(id);
    return resultTeamsId as ITeams;
  };
}

export default TeamsService;
