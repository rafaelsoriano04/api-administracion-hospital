// src/index.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// DataSources
import { centralDataSource } from './data-source/centralDataSource';
import { centro1DataSource } from './data-source/centro1DataSource';
import { centro2DataSource } from './data-source/centro2DataSource';

// Rutas
import centroMedicoRoutes from './routes/centroMedicoRoutes';
import medicoRoutes from './routes/medicoRoutes';
import empleadoRoutes from './routes/empleadoRoutes';
import especialidadRoutes from './routes/especialidadRoutes';



dotenv.config();

async function startServer() {
  try {
    // Inicializamos cada DataSource
    await centralDataSource.initialize();
    console.log('Conexión con base de datos central establecida.');

    await centro1DataSource.initialize();
    console.log('Conexión con base de datos centro1 establecida.');

    await centro2DataSource.initialize();
    console.log('Conexión con base de datos centro2 establecida.');

    // Creamos la app de Express
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Rutas
    app.use('/api/centros-medicos', centroMedicoRoutes);
     app.use('/api/medicos', medicoRoutes);
    app.use('/api/especialidades', especialidadRoutes);
     app.use('/api/empleados', empleadoRoutes);

    // Levantamos el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();
