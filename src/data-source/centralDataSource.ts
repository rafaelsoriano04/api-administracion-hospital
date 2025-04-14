// src/data-source/centralDataSource.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { CentroMedico } from '../entities/CentroMedico';
import { Medico } from '../entities/Medico';
import { Especialidad } from '../entities/Especialidad';
import { Empleado } from '../entities/Empleado';

// Carga variables de entorno
dotenv.config();

export const centralDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_CENTRAL,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_CENTRAL,
  entities: [CentroMedico, Medico, Especialidad, Empleado],
  synchronize: false,
});
