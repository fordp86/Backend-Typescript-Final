import { Sequelize } from "sequelize";
import { RantFactory, AssociateUserRant } from "./rant";
import { UserFactory } from "./user";

const jawsdb: string = process.env.JAWSDB_URL || "";
const dbname: string = process.env.DB_NAME || "";
const dbuser: string = process.env.DB_USER || "";
const dbpassword: string = process.env.DB_PW || "";

let sequelize;

if (jawsdb) {
  sequelize = new Sequelize(jawsdb);
} else {
  sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  });
}

RantFactory(sequelize);
UserFactory(sequelize);
AssociateUserRant();

export const db = sequelize;