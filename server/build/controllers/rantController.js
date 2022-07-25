"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRant = exports.editRant = exports.addRant = exports.getRant = exports.getAllRants = void 0;
const rant_1 = require("../models/rant");
const auth_1 = require("../services/auth");
// Get All Rants
const getAllRants = async (req, res, next) => {
    let rantList = await rant_1.Rants.findAll();
    res.status(200).json(rantList);
};
exports.getAllRants = getAllRants;
// Get One Rant
const getRant = async (req, res, next) => {
    let itemId = req.params.rantId;
    let rantItem = await rant_1.Rants.findByPk(itemId);
    res.status(200).json(rantItem);
};
exports.getRant = getRant;
// Add A Rant
const addRant = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newRant = req.body;
    newRant.userId = user.userId;
    if (newRant.rantBody) {
        let created = await rant_1.Rants.create(newRant);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.addRant = addRant;
// Edit Existing Rants
const editRant = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.rantId;
    let updatedItem = req.body;
    let [updated] = await rant_1.Rants.update(updatedItem, {
        where: { rantId: itemId }
    });
    if (updated === 1) {
        res.status(200).json(updatedItem);
    }
};
exports.editRant = editRant;
// Delete A Rant
const deleteRant = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.rantId;
    let result = await rant_1.Rants.destroy({
        where: { rantId: itemId }
    });
    res.status(200).json(result);
};
exports.deleteRant = deleteRant;
