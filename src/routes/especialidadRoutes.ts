import { Router } from 'express';
import { EspecialidadController } from '../controllers/especialidadController';

const router = Router();

router.get('/', EspecialidadController.getAll);
router.get('/:id', EspecialidadController.getById);
router.post('/', EspecialidadController.create);
router.put('/:id', EspecialidadController.update);
router.delete('/:id', EspecialidadController.delete);

export default router;