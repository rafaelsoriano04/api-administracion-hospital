import { RequestHandler } from "express";
import { centro1DataSource } from "../data-source/centro1DataSource";
import { Paciente } from "../entities/Paciente";
import { centro2DataSource } from "../data-source/centro2DataSource";
import { centro3DataSource } from "../data-source/centro3DataSource";


export class PacienteController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo1 = centro1DataSource.getRepository(Paciente);
            const pacientes1 = await repo1.find();
    
            const repo2 = centro2DataSource.getRepository(Paciente);
            const pacientes2 = await repo2.find();

            const repo3 = centro3DataSource.getRepository(Paciente);
            const pacientes3 = await repo3.find();
    
            const todosLosPacientes = [...pacientes1, ...pacientes2, ...pacientes3];
    
            res.json(todosLosPacientes);
        } catch (err) {
            console.error("Error al obtener pacientes:", err);
            res.status(500).json({ error: 'Error al obtener pacientes' });
        }
    };
    
}