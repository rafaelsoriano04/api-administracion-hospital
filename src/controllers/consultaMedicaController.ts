import { RequestHandler } from "express";
import { centro1DataSource } from "../data-source/centro1DataSource";
import { centro2DataSource } from "../data-source/centro2DataSource";
import { Paciente } from "../entities/Paciente";
import { ConsultaMedica } from "../entities/ConsultaMedica";

export class ConsultaMedicaController {
    static getAll: RequestHandler = async (req, res) => {
            try {
                const repo1 = centro1DataSource.getRepository(ConsultaMedica);
                const consultas1 = await repo1.find();
        
                const repo2 = centro2DataSource.getRepository(ConsultaMedica);
                const consultas2 = await repo2.find();
        
                const todasLasConsultas = [...consultas1, ...consultas2];
        
                res.json(todasLasConsultas);
            } catch (err) {
                console.error("Error al obtener consultas medicas:", err);
                res.status(500).json({ error: 'Error al obtener consultas medicas' });
            }
        };
}