import { Router } from 'express';
import { MedicoController } from '../controllers/medicoController';

const router = Router();

router.get('/', MedicoController.getAll);
router.get('/:id', MedicoController.getById);
router.post('/', MedicoController.create);
router.put('/:id', MedicoController.update);
router.delete('/:id', MedicoController.delete);

export default router;