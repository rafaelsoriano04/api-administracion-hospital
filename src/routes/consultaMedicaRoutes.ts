import { Router } from 'express';
import { MedicoController } from '../controllers/medicoController';
import { PacienteController } from '../controllers/pacienteController';
import { ConsultaMedicaController } from '../controllers/consultaMedicaController';

const router = Router();

router.get('/', ConsultaMedicaController.getAll);


export default router;