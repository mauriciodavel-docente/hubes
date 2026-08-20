import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { APP_CONFIG } from '../backend/src/config/appConfig.js';
import { uploadDirectory } from '../backend/src/config/uploadConfig.js';
import apiRoutes from '../backend/src/routes/index.js';
import apiErrorHandler from '../backend/src/middlewares/apiErrorHandler.js';
import { httpLogger } from '../backend/src/middlewares/httpLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Incoming ${req.method} ${req.path}`, req.headers['content-type']);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(httpLogger);

// Static files (uploads)
app.use('/uploads', express.static(uploadDirectory));

// API routes - No Vercel, as rotas vêm sem /api prefix
// Mapping: /api/auth/login → / no handler → /auth/login nas rotas
app.use('/', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  console.log('Health check called');
  res.json({ success: true, message: 'SIGA Secult Backend está rodando!' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

// Error handler
app.use(apiErrorHandler);

// Export para Vercel Serverless Functions
export default app;
