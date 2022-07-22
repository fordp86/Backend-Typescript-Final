import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";


export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>>{
    declare userId: number;
    declare username: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare city: string;
    declare state: string;
}

export function UserFactory(sequelize: Sequelize) {
    Users.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}