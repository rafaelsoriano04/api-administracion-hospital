import { Request, Response, RequestHandler } from 'express';
import { centralDataSource } from '../data-source/centralDataSource';
import { centro1DataSource } from '../data-source/centro1DataSource';
import { centro2DataSource } from '../data-source/centro2DataSource';
import { Medico } from '../entities/Medico';
import { ConsultaMedica } from '../entities/ConsultaMedica';

export class MedicoController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo = centralDataSource.getRepository(Medico);
            const medicos = await repo.find({ relations: ['especialidad', 'centroMedico'] });
            res.json(medicos);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener médicos' });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(Medico);
            const medico = await repo.findOne({
                where: { id: parseInt(id) },
                relations: ['especialidad', 'centroMedico'],
            });
            if (!medico) {
                res.status(404).json({ error: 'Médico no encontrado' });
                return;
            }

            const consultasCentro1 = await centro1DataSource.getRepository(ConsultaMedica).find({
                where: { medico_id: parseInt(id) },
            });
            const consultasCentro2 = await centro2DataSource.getRepository(ConsultaMedica).find({
                where: { medico_id: parseInt(id) },
            });

            const medicoResponse = {
                ...medico,
                consultas: {
                    centro1: consultasCentro1,
                    centro2: consultasCentro2,
                },
            };

            res.json(medicoResponse);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener médico' });
        }
    };

    static create: RequestHandler = async (req, res) => {
        const { nombre, especialidad_id, centro_medico_id } = req.body;
        try {
            const repo = centralDataSource.getRepository(Medico);
            const medico = repo.create({ nombre, especialidad_id, centro_medico_id });
            const result = await repo.save(medico);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear médico' });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { nombre, especialidad_id, centro_medico_id } = req.body;
        try {
            const repo = centralDataSource.getRepository(Medico);
            const medico = await repo.findOneBy({ id: parseInt(id) });
            if (!medico) {
                res.status(404).json({ error: 'Médico no encontrado' });
                return;
            }
            medico.nombre = nombre;
            medico.especialidad_id = especialidad_id;
            medico.centro_medico_id = centro_medico_id;
            const result = await repo.save(medico);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar médico' });
        }
    };

    static delete: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centralDataSource.getRepository(Medico);
            const medico = await repo.findOneBy({ id: parseInt(id) });
            if (!medico) {
                res.status(404).json({ error: 'Médico no encontrado' });
                return;
            }
            await repo.remove(medico);
            res.json({ message: 'Médico eliminado', data: medico });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar médico' });
        }
    };
}