import { RequestHandler } from 'express';
import MatchesService from '../service/MatchesService';
// import CustomError from '../error/CustomError';

class MatchesController {
  constructor(protected matchesService = new MatchesService()) {}

  public getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;

    const matchesService = await this.matchesService.getAll(inProgress);
    return res.status(200).json(matchesService);
  };

  public create:RequestHandler = async (req, res) => {
    const salveMatch = await this.matchesService.create(req.body);
    return res.status(201).json(salveMatch);
  };

  // public updateMatch:RequestHandler = async (req, res) => {
  //   const { id } = req.params;
  //   await this.matchesService.updateMatch(Number(id));
  //   return res.status(200).json({ message: 'Finished' });
  // };
}

export default MatchesController;
