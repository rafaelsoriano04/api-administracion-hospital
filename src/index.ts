import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Centros Médicos',
      version: '1.0.0',
      description: 'API para gestionar centros médicos, médicos, empleados y especialidades',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

async function startServer() {
  try {
    await centralDataSource.initialize();
    console.log('Conexión con base de datos central establecida.');

    await centro1DataSource.initialize();
    console.log('Conexión con base de datos centro1 establecida.');

    await centro2DataSource.initialize();
    console.log('Conexión con base de datos centro2 establecida.');

    const app = express();
    app.use(cors());
    app.use(express.json());

  
    app.use('/administracion-Hospital', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

   
    app.use('/api/centros-medicos', centroMedicoRoutes);
    app.use('/api/medicos', medicoRoutes);
    app.use('/api/especialidades', especialidadRoutes);
    app.use('/api/empleados', empleadoRoutes);


    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Documentación Swagger disponible en http://localhost:${PORT}/administracion-Hospital`);
    });

  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();