"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.userProfilePage = exports.userAccess = exports.findUserRants = exports.getUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
// Get All Users
const getAllUsers = async (req, res, next) => {
    let userList = await user_1.Users.findAll();
    res.status(200).json(userList);
};
exports.getAllUsers = getAllUsers;
// Get One User
const getUser = async (req, res, next) => {
    let itemId = parseInt(req.params.userId);
    let userItem = await user_1.Users.findByPk(itemId);
    res.status(200).json(userItem);
};
exports.getUser = getUser;
// Find User Rants
const findUserRants = async (req, res, next) => {
    let itemId = parseInt(req.params.userId);
    let userItem = await user_1.Users.findByPk(itemId);
    res.status(200).json(userItem);
};
exports.findUserRants = findUserRants;
// User Access
const userAccess = async (req, res, next) => {
    if (req.user) {
        res.redirect('/user/login');
    }
    else {
        res.redirect('/user/login');
    }
};
exports.userAccess = userAccess;
const userProfilePage = async (req, res, next) => {
};
exports.userProfilePage = userProfilePage;
const createUser = async (req, res, next) => {
    let newUser = req.body;
    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
            newUser.password = hashedPassword;
            let created = await user_1.Users.create(newUser);
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
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.Users.findOne({
        where: { username: req.body.username }
    });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
exports.loginUser = loginUser;
