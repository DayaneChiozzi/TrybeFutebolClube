import { RequestHandler } from 'express';
import MatchesService from '../service/MatchesService';

class MatchesController {
  constructor(protected matchesService = new MatchesService()) {}

  public getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;

    const matchesService = await this.matchesService.getAll(inProgress);
    return res.status(200).json(matchesService);
  };
}

export default MatchesController;
