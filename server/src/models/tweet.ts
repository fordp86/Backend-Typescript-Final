import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { Users } from "./user";


export class Tweets extends Model<InferAttributes<Tweets>, InferCreationAttributes<Tweets>>{
    declare tweetId: number;
    declare tweet: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function TweetFactory(sequelize: Sequelize) {
    Tweets.init({
        tweetId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tweet: {
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
        tableName: 'tweets',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateUserTweet() {
    Users.hasMany(Tweets, { foreignKey: 'userId' });
    Tweets.belongsTo(Users, { foreignKey: 'userId' });
}