import { Sequelize, Dialect } from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT } = process.env;

const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT as Dialect,
  }
);

export default sequelize;
