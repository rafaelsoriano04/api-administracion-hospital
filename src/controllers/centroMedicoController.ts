import { Request, Response, RequestHandler } from 'express';
import { centralDataSource } from '../data-source/centralDataSource';
import { CentroMedico } from '../entities/CentroMedico';

export class CentroMedicoController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo = centralDataSource.getRepository(CentroMedico);
            const centros = await repo.find();
            res.json(centros);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener centros médicos' });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(CentroMedico);
            const centro = await repo.findOneBy({ id: parseInt(id) });
            if (!centro) {
                res.status(404).json({ error: 'Centro médico no encontrado' });
                return;
            }
            res.json(centro);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener centro médico' });
        }
    };

    static create: RequestHandler = async (req, res) => {
        const { nombre, direccion } = req.body;
        try {
            const repo = centralDataSource.getRepository(CentroMedico);
            const centro = repo.create({ nombre, direccion });
            const result = await repo.save(centro);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear centro médico' });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { nombre, direccion } = req.body;
        try {
            const repo = centralDataSource.getRepository(CentroMedico);
            const centro = await repo.findOneBy({ id: parseInt(id) });
            if (!centro) {
                res.status(404).json({ error: 'Centro médico no encontrado' });
                return;
            }
            centro.nombre = nombre;
            centro.direccion = direccion;
            const result = await repo.save(centro);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar centro médico' });
        }
    };

    static delete: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(CentroMedico);
            const centro = await repo.findOneBy({ id: parseInt(id) });
            if (!centro) {
                res.status(404).json({ error: 'Centro médico no encontrado' });
                return;
            }
            await repo.remove(centro);
            res.json({ message: 'Centro médico eliminado', data: centro });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar centro médico' });
        }
    };
}