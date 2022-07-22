"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetFactory = exports.Tweets = void 0;
const sequelize_1 = require("sequelize");
class Tweets extends sequelize_1.Model {
}
exports.Tweets = Tweets;
function TweetFactory(sequelize) {
    Tweets.init({
        tweetId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tweet: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        tableName: 'tweets',
        freezeTableName: true,
        sequelize
    });
}
exports.TweetFactory = TweetFactory;
