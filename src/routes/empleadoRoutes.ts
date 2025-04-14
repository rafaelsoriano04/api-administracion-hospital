import { Router } from 'express';
import { EmpleadoController } from '../controllers/empleadoController';

const router = Router();

router.get('/', EmpleadoController.getAll);
router.get('/:id', EmpleadoController.getById);
router.post('/', EmpleadoController.create);
router.put('/:id', EmpleadoController.update);
router.delete('/:id', EmpleadoController.delete);

export default router;