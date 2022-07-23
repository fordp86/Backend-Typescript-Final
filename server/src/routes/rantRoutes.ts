import { Router } from 'express';
import { addRant, editRant, deleteRant, getAllRants, getRant } from '../controllers/rantController';

const router = Router();

router.get('/', getAllRants);
router.get('/:rantId', getRant);
router.post('/', addRant);
router.put('/:rantId', editRant);
router.delete('/:rantId', deleteRant);

export default router;