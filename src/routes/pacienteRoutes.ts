import { Router } from 'express';
import { MedicoController } from '../controllers/medicoController';
import { PacienteController } from '../controllers/pacienteController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gestión de médicos
 */

/**
 * @swagger
 * /api/medicos:
 *   get:
 *     summary: Obtiene todos los médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID del médico
 *                   nombre:
 *                     type: string
 *                     description: Nombre del médico
 *                   especialidad:
 *                     type: string
 *                     description: Especialidad del médico
 *       500:
 *         description: Error del servidor
 */
router.get('/', PacienteController.getAll);


export default router;