import { RequestHandler } from 'express';
import MatchesService from '../service/MatchesService';

class MatchesController {
  constructor(protected matchesService = new MatchesService()) {}

  public getAll: RequestHandler = async (_req, res) => {
    const matchesService = await this.matchesService.getAll();
    return res.status(200).json(matchesService);
  };
}

export default MatchesController;
