import { Router } from 'express';
import { CentroMedicoController } from '../controllers/centroMedicoController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Centros Médicos
 *   description: Gestión de centros médicos
 */

/**
 * @swagger
 * /api/centros-medicos:
 *   get:
 *     summary: Obtiene todos los centros médicos
 *     tags: [Centros Médicos]
 *     responses:
 *       200:
 *         description: Lista de centros médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID del centro médico
 *                   nombre:
 *                     type: string
 *                     description: Nombre del centro médico
 *                   direccion:
 *                     type: string
 *                     description: Dirección del centro médico
 *       500:
 *         description: Error del servidor
 */
router.get('/', CentroMedicoController.getAll);

/**
 * @swagger
 * /api/centros-medicos/{id}:
 *   get:
 *     summary: Obtiene un centro médico por ID
 *     tags: [Centros Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del centro médico
 *     responses:
 *       200:
 *         description: Detalles del centro médico
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del centro médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del centro médico
 *                 direccion:
 *                   type: string
 *                   description: Dirección del centro médico
 *       404:
 *         description: Centro médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', CentroMedicoController.getById);

/**
 * @swagger
 * /api/centros-medicos:
 *   post:
 *     summary: Crea un nuevo centro médico
 *     tags: [Centros Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - direccion
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del centro médico
 *               direccion:
 *                 type: string
 *                 description: Dirección del centro médico
 *     responses:
 *       201:
 *         description: Centro médico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del centro médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del centro médico
 *                 direccion:
 *                   type: string
 *                   description: Dirección del centro médico
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', CentroMedicoController.create);

/**
 * @swagger
 * /api/centros-medicos/{id}:
 *   put:
 *     summary: Actualiza un centro médico por ID
 *     tags: [Centros Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del centro médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del centro médico
 *               direccion:
 *                 type: string
 *                 description: Dirección del centro médico
 *     responses:
 *       200:
 *         description: Centro médico actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del centro médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del centro médico
 *                 direccion:
 *                   type: string
 *                   description: Dirección del centro médico
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Centro médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', CentroMedicoController.update);

/**
 * @swagger
 * /api/centros-medicos/{id}:
 *   delete:
 *     summary: Elimina un centro médico por ID
 *     tags: [Centros Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del centro médico
 *     responses:
 *       204:
 *         description: Centro médico eliminado exitosamente
 *       404:
 *         description: Centro médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', CentroMedicoController.delete);

export default router;