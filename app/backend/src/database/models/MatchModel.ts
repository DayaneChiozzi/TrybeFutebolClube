import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamsModel';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

Match.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
