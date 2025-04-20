import { Router } from 'express';
import { EmpleadoController } from '../controllers/empleadoController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Gestión de empleados
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID del empleado
 *                   nombre:
 *                     type: string
 *                     description: Nombre del empleado
 *                   cargo:
 *                     type: string
 *                     description: Cargo del empleado
 *       500:
 *         description: Error del servidor
 */
router.get('/', EmpleadoController.getAll);

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Detalles del empleado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del empleado
 *                 cargo:
 *                   type: string
 *                   description: Cargo del empleado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', EmpleadoController.getById);

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - cargo
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *               cargo:
 *                 type: string
 *                 description: Cargo del empleado
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del empleado
 *                 cargo:
 *                   type: string
 *                   description: Cargo del empleado
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', EmpleadoController.create);

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualiza un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *               cargo:
 *                 type: string
 *                 description: Cargo del empleado
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del empleado
 *                 nombre:
 *                   type: string
 *                   description: Nombre del empleado
 *                 cargo:
 *                   type: string
 *                   description: Cargo del empleado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', EmpleadoController.update);

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Elimina un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del empleado
 *     responses:
 *       204:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', EmpleadoController.delete);

export default router;