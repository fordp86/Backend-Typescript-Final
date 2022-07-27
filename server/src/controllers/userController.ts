import { RequestHandler } from "express";
import { Users } from "../models/user";
import { Rants } from "../models/rant";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

// Get All Users
export const getAllUsers: RequestHandler = async (req, res, next) => {
    let userList: Users[] = await Users.findAll();
    res.status(200).json(userList);
}

// Get One User
export const getUser: RequestHandler = async (req, res, next) => {
    let itemId = parseInt(req.params.userId);
    let userItem: Users | null = await Users.findByPk(itemId);
    res.status(200).json(userItem);
}

// Find User Rants
export const findUserRants: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let foundRants: Rants = req.body;
    foundRants.userId = user.userId;

    if (foundRants.rantBody) {
        let itemId = parseInt(req.params.userId);

        const posts = await Rants.findAll({
            where: {
            userId: itemId
            }
        });

        res.status(200).json(posts);
    }
    else {
        res.status(400).send();
    }
}

// Edit Existing Users
export const editUser: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = parseInt(req.params.userId);
    let updatedItem: Users = req.body;

    let [updated] = await Users.update(updatedItem, {
        where: { userId: itemId }
    });

    if(updated === 1) {
        res.status(200).json(updatedItem);
    }
}

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: Users = req.body;

    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await Users.create(newUser);
            res.status(201).json({
                username: created.username,
                userId: created.userId
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: Users | null = await Users.findOne({ 
        where: { username: req.body.username }
    });

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}
