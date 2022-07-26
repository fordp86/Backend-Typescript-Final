import { Router } from 'express';
import { createUser, loginUser, getAllUsers, getUser } from '../controllers/userController';

const router = Router();

router.get('/profiles', getAllUsers);
router.get('/profiles/:userId', getUser);
router.post('/', createUser);
router.post('/login', loginUser);


export default router;