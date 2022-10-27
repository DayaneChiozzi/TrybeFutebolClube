import { RequestHandler } from 'express';
import TeamsService from '../service/TeamsService';

class TeamsController {
  constructor(protected teamsService = new TeamsService()) { }

  public getAll: RequestHandler = async (_req, res) => {
    const ResultService = await this.teamsService.getAll();
    return res.status(200).json(ResultService);
  };
}

export default TeamsController;
