import { Request, Response, RequestHandler } from 'express';
import { centralDataSource } from '../data-source/centralDataSource';
import { Empleado } from '../entities/Empleado';

export class EmpleadoController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo = centralDataSource.getRepository(Empleado);
            const empleados = await repo.find({ relations: ['centroMedico'] });
            res.json(empleados);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener empleados' });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(Empleado);
            const empleado = await repo.findOne({
                where: { id: parseInt(id) },
                relations: ['centroMedico'],
            });
            if (!empleado) {
                res.status(404).json({ error: 'Empleado no encontrado' });
                return;
            }
            res.json(empleado);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener empleado' });
        }
    };

    static create: RequestHandler = async (req, res) => {
        const { nombre, cargo, centro_medico_id } = req.body;
        try {
            const repo = centralDataSource.getRepository(Empleado);
            const empleado = repo.create({ nombre, cargo, centro_medico_id });
            const result = await repo.save(empleado);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear empleado' });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { nombre, cargo, centro_medico_id } = req.body;
        try {
            const repo = centralDataSource.getRepository(Empleado);
            const empleado = await repo.findOneBy({ id: parseInt(id) });
            if (!empleado) {
                res.status(404).json({ error: 'Empleado no encontrado' });
                return;
            }
            empleado.nombre = nombre;
            empleado.cargo = cargo;
            empleado.centro_medico_id = centro_medico_id;
            const result = await repo.save(empleado);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar empleado' });
        }
    };

    static delete: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(Empleado);
            const empleado = await repo.findOneBy({ id: parseInt(id) });
            if (!empleado) {
                res.status(404).json({ error: 'Empleado no encontrado' });
                return;
            }
            await repo.remove(empleado);
            res.json({ message: 'Empleado eliminado', data: empleado });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar empleado' });
        }
    };
}