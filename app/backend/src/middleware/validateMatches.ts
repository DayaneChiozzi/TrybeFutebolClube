import { RequestHandler } from 'express';
import TeamsService from '../service/TeamsService';

const { getByPk } = new TeamsService();

const validateMatches:RequestHandler = async (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;
  const teamHome = await getByPk(homeTeam);
  const teamAway = await getByPk(awayTeam);

  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  if (!teamHome || !teamAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateMatches;
