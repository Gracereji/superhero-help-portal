import express from 'express';
import { getHealthStatus } from '../controllers/healthController.js';

const router = express.Router();

// GET /api/health - Endpoint to check server status & superhero core info
router.get('/health', getHealthStatus);

export default router;
