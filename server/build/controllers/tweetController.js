"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweet = exports.editTweet = exports.addTweet = exports.getTweet = exports.getAllTweets = void 0;
const tweet_1 = require("../models/tweet");
const auth_1 = require("../services/auth");
const getAllTweets = async (req, res, next) => {
    let tweetList = await tweet_1.Tweets.findAll();
    res.status(200).json(tweetList);
};
exports.getAllTweets = getAllTweets;
const getTweet = async (req, res, next) => {
    let itemId = req.params.id;
    let tweetItem = await tweet_1.Tweets.findByPk(itemId);
    res.status(200).json(tweetItem);
};
exports.getTweet = getTweet;
const addTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newTweet = req.body;
    newTweet.userId = user.userId;
    if (newTweet.tweet) {
        let created = await tweet_1.Tweets.create(newTweet);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.addTweet = addTweet;
const editTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.tweetId;
    let updatedItem = req.body;
    let [updated] = await tweet_1.Tweets.update(updatedItem, {
        where: { tweetId: itemId }
    });
    if (updated === 1) {
        res.status(200).json(updatedItem);
    }
};
exports.editTweet = editTweet;
const deleteTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.tweetId;
    let result = await tweet_1.Tweets.destroy({
        where: { tweetId: itemId }
    });
    res.status(200).json(result);
};
exports.deleteTweet = deleteTweet;
