// src/routes/centroMedicoRoutes.ts
import { Router } from 'express';
import { CentroMedicoController } from '../controllers/centroMedicoController';

const router = Router();

router.get('/', CentroMedicoController.getAll);
router.get('/:id', CentroMedicoController.getById);
router.post('/', CentroMedicoController.create);
router.put('/:id', CentroMedicoController.update);
router.delete('/:id', CentroMedicoController.delete);

export default router;
