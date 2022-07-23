import { RequestHandler } from "express";
import { Rants } from "../models/rant";
import { Users } from "../models/user";
import { verifyUser } from "../services/auth";

// Get All Rants
export const getAllRants: RequestHandler = async (req, res, next) => {
    let rantList: Rants[] = await Rants.findAll();
    res.status(200).json(rantList);
}

// Get One Rant
export const getRant: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let rantItem: Rants | null = await Rants.findByPk(itemId);
    res.status(200).json(rantItem);
}

// Add A Rant
export const addRant: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newRant: Rants = req.body;
    newRant.userId = user.userId;

    if (newRant.rantBody) {
        let created = await Rants.create(newRant);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

// Edit Existing Rants
export const editRant: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.rantId;
    let updatedItem: Rants = req.body;

    let [updated] = await Rants.update(updatedItem, {
        where: { rantId: itemId }
    });

    if(updated === 1) {
        res.status(200).json(updatedItem);
    }
}

// Delete A Rant
export const deleteRant: RequestHandler = async (req, res, next) => {
    let user: Users | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.rantId;

    let result = await Rants.destroy({
        where: { rantId: itemId }
    });
    res.status(200).json(result);
}