import { Router } from 'express';
import { createUser, loginUser, getAllUsers, getUser, findUserRants, editUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/profiles', getAllUsers);
router.get('/profiles/:userId', getUser);
//router.get('/profiles/:userId', findUserRants);
router.put('/profiles/:userId', editUser);



export default router;