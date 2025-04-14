// src/data-source/centro2DataSource.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { CentroMedico } from '../entities/CentroMedico';
import { Medico } from '../entities/Medico';
import { Especialidad } from '../entities/Especialidad';
import { Empleado } from '../entities/Empleado';
import { ConsultaMedica } from '../entities/ConsultaMedica';

dotenv.config();

export const centro2DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_CENTRO2,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_CENTRO2,
  entities: [ConsultaMedica],
  synchronize: false,
});
