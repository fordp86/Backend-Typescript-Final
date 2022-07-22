import { RequestHandler } from "express";
import { Tweets } from "../models/tweet";
import { Users } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllTweets: RequestHandler = async (req, res, next) => {
    let tweetList: Tweets[] = await Tweets.findAll();
    res.status(200).json(tweetList);
}

export const getTweet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let tweetItem: Tweets | null = await Tweets.findByPk(itemId);
    res.status(200).json(tweetItem);
}

export const addTweet: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newTweet: Tweets = req.body;
    await Tweets.create(newTweet);

    try {
        await newTweet.save();
        res.status(201).json(newTweet);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const editTweet: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.tweetId;
    let updatedItem: Tweets = req.body;

    let [updated] = await Tweets.update(updatedItem, {
        where: { tweetId: itemId }
    });

    if(updated === 1) {
        res.status(200).json(updatedItem);
    }
}

export const deleteTweet: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.tweetId;

    let result = await Tweets.destroy({
        where: { tweetId: itemId }
    });
    res.status(200).json(result);
}