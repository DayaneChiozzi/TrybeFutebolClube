import { RequestHandler } from 'express';
import LeaderService from '../service/LeaderService';

class LeaderController {
  service = new LeaderService();

  public classification:RequestHandler = async (req, res) => {
    const result = await this.service.classification();
    return res.status(200).json(result);
  };
}

export default LeaderController;
