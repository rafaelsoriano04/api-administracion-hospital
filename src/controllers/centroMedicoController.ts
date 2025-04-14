// src/controllers/centroMedicoController.ts
import { Request, Response } from 'express';
import { centralDataSource } from '../data-source/centralDataSource'; 
import { CentroMedico } from '../entities/CentroMedico';

export class CentroMedicoController {
  // GET /api/centros-medicos
  static async getAll(req: Request, res: Response) {
    try {
      const repo = centralDataSource.getRepository(CentroMedico);
      const centros = await repo.find(); // SELECT * FROM centro_medico
      return res.json(centros);
    } catch (error) {
      console.error('Error al obtener centros médicos:', error);
      return res.status(500).json({ error: 'Error al obtener centros médicos' });
    }
  }

  // GET /api/centros-medicos/:id
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const repo = centralDataSource.getRepository(CentroMedico);
      const centro = await repo.findOneBy({ id: parseInt(id) });
      if (!centro) {
        return res.status(404).json({ message: 'Centro médico no encontrado' });
      }
      return res.json(centro);
    } catch (error) {
      console.error('Error al obtener centro médico:', error);
      return res.status(500).json({ error: 'Error al obtener centro médico' });
    }
  }

  // POST /api/centros-medicos
  static async create(req: Request, res: Response) {
    const { nombre, direccion } = req.body;
    try {
      const repo = centralDataSource.getRepository(CentroMedico);
      const nuevo = repo.create({ nombre, direccion }); // crea instancia
      await repo.save(nuevo); // INSERT
      return res.status(201).json(nuevo);
    } catch (error) {
      console.error('Error al crear centro médico:', error);
      return res.status(500).json({ error: 'Error al crear centro médico' });
    }
  }

  // PUT /api/centros-medicos/:id
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, direccion } = req.body;
    try {
      const repo = centralDataSource.getRepository(CentroMedico);
      const centro = await repo.findOneBy({ id: parseInt(id) });
      if (!centro) {
        return res.status(404).json({ message: 'Centro médico no encontrado' });
      }
      centro.nombre = nombre;
      centro.direccion = direccion;
      await repo.save(centro);
      return res.json(centro);
    } catch (error) {
      console.error('Error al actualizar centro médico:', error);
      return res.status(500).json({ error: 'Error al actualizar centro médico' });
    }
  }

  // DELETE /api/centros-medicos/:id
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const repo = centralDataSource.getRepository(CentroMedico);
      const result = await repo.delete(id);
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Centro médico no encontrado' });
      }
      return res.json({ message: 'Centro médico eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar centro médico:', error);
      return res.status(500).json({ error: 'Error al eliminar centro médico' });
    }
  }
}