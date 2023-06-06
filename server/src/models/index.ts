import { Sequelize } from "sequelize";
import { RantFactory, AssociateUserRant } from "./rant";
import { UserFactory } from "./user";

const dbName = 'hoyrstdyzb3bsz4e';
const username = 'exufwwlzdmqm48p8';
const password = 'urbr9eik9qqxub7j';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'h1use0ulyws4lqr1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql'
});

RantFactory(sequelize);
UserFactory(sequelize);
AssociateUserRant();

export const db = sequelize;