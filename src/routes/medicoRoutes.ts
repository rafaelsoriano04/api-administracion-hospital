import { Router } from 'express';
import { MedicoController } from '../controllers/medicoController';

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
router.get('/', MedicoController.getAll);

/**
 * @swagger
 * /api/medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Detalles del médico
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del médico
 *                 especialidad:
 *                   type: string
 *                   description: Especialidad del médico
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', MedicoController.getById);

/**
 * @swagger
 * /api/medicos:
 *   post:
 *     summary: Crea un nuevo médico
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - especialidad
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del médico
 *               especialidad:
 *                 type: string
 *                 description: Especialidad del médico
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del médico
 *                 especialidad:
 *                   type: string
 *                   description: Especialidad del médico
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', MedicoController.create);

/**
 * @swagger
 * /api/medicos/{id}:
 *   put:
 *     summary: Actualiza un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del médico
 *               especialidad:
 *                 type: string
 *                 description: Especialidad del médico
 *     responses:
 *       200:
 *         description: Médico actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del médico
 *                 especialidad:
 *                   type: string
 *                   description: Especialidad del médico
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', MedicoController.update);

/**
 * @swagger
 * /api/medicos/{id}:
 *   delete:
 *     summary: Elimina un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del médico
 *     responses:
 *       204:
 *         description: Médico eliminado exitosamente
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', MedicoController.delete);

export default router;