import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";


export class Tweets extends Model<InferAttributes<Tweets>, InferCreationAttributes<Tweets>>{
    declare tweetId: number;
    declare tweet: string;
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