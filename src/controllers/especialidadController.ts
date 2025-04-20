import { Request, Response, RequestHandler } from 'express';
import { centralDataSource } from '../data-source/centralDataSource';
import { Especialidad } from '../entities/Especialidad';

export class EspecialidadController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo = centralDataSource.getRepository(Especialidad);
            const especialidades = await repo.find();
            res.json(especialidades);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener especialidades' });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(Especialidad);
            const especialidad = await repo.findOneBy({ id: parseInt(id) });
            if (!especialidad) {
                res.status(404).json({ error: 'Especialidad no encontrada' });
                return; // Aquí no devolvemos el resultado de res.status().json()
            }
            res.json(especialidad);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener especialidad' });
        }
    };

    static create: RequestHandler = async (req, res) => {
        console.log("Solicitud recibida en create - Cuerpo de la solicitud:", req.body);
        const { nombre } = req.body;
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            console.log("Error: Nombre no proporcionado o inválido");
            res.status(400).json({ error: 'El campo nombre es obligatorio y debe ser una cadena no vacía' });
            return;
        }
        try {
            const repo = centralDataSource.getRepository(Especialidad);
            console.log("Creando especialidad con datos:", { nombre });
            const especialidad = repo.create({ nombre });
            console.log("Especialidad creada (antes de guardar):", especialidad);
            const result = await repo.save(especialidad);
            console.log("Especialidad guardada exitosamente:", result);
            res.status(201).json(result);
        } catch (err) {
            console.error("Error al crear especialidad:", err);
            res.status(500).json({ error: 'Error al crear especialidad', details: err.message });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            const repo = centralDataSource.getRepository(Especialidad);
            const especialidad = await repo.findOneBy({ id: parseInt(id) });
            if (!especialidad) {
                res.status(404).json({ error: 'Especialidad no encontrada' });
                return;
            }
            especialidad.nombre = nombre;
            const result = await repo.save(especialidad);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar especialidad' });
        }
    };

    static delete: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(Especialidad);
            const especialidad = await repo.findOneBy({ id: parseInt(id) });
            if (!especialidad) {
                res.status(404).json({ error: 'Especialidad no encontrada' });
                return;
            }
            await repo.remove(especialidad);
            res.json({ message: 'Especialidad eliminada', data: especialidad });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar especialidad' });
        }
    };
}