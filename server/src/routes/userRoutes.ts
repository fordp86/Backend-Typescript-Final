import { Router } from 'express';
import { createUser, loginUser, getAllUsers, getUser, findUserRants, editUser } from '../controllers/userController';

const router = Router();

router.get('/profiles', getAllUsers);
router.get('/profiles/:userId', getUser);
router.get('/profiles/:userId', findUserRants);
router.get('/profiles/:userId', editUser);
router.post('/', createUser);
router.post('/login', loginUser);


export default router;