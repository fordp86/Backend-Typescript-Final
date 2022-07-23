import { Sequelize } from "sequelize";
import { TweetFactory, AssociateUserTweet } from "./rant";
import { UserFactory } from "./user";

const dbName = 'tweetsDB';
const username = 'root';
const password = '123';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

TweetFactory(sequelize);
UserFactory(sequelize);
AssociateUserTweet();

export const db = sequelize;