import Sequelize from 'sequelize';
import sequelize from '../database';

export interface IUserModel {
  id: number;
  shared: boolean;
  email: string | null;
}

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shared: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
