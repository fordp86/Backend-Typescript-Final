"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/profiles', userController_1.getAllUsers);
router.get('/profiles/:userId', userController_1.getUser);
router.post('/', userController_1.createUser);
router.post('/login', userController_1.loginUser);
exports.default = router;
