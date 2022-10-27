import { RequestHandler } from 'express';
import TeamsService from '../service/TeamsService';

class TeamsController {
  constructor(protected teamsService = new TeamsService()) { }

  public getAll: RequestHandler = async (_req, res) => {
    const resultService = await this.teamsService.getAll();
    return res.status(200).json(resultService);
  };

  public getByPk: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const resultTeamsId = await this.teamsService.getByPk(Number(id));
    return res.status(200).json(resultTeamsId);
  };
}

export default TeamsController;
