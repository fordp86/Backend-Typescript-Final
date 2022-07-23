import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { Users } from "./user";


export class Rants extends Model<InferAttributes<Rants>, InferCreationAttributes<Rants>>{
    declare rantId: number;
    declare rantBody: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function RantFactory(sequelize: Sequelize) {
    Rants.init({
        rantId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rantBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'rants',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateUserRant() {
    Users.hasMany(Rants, { foreignKey: 'userId' });
    Rants.belongsTo(Users, { foreignKey: 'userId' });
}