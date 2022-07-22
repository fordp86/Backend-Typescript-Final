import { Sequelize } from "sequelize";
import { TweetFactory } from "./tweet";

const dbName = 'tweets';
const username = 'root';
const password = '123';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

TweetFactory(sequelize);

export const db = sequelize;