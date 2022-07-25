import { Sequelize } from "sequelize";
import { RantFactory, AssociateUserRant } from "./rant";
import { UserFactory } from "./user";

const dbName = 'rantsDB';
const username = 'root';
const password = 'Acc3ss2184!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

RantFactory(sequelize);
UserFactory(sequelize);
AssociateUserRant();

export const db = sequelize;