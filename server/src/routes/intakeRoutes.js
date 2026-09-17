import express from 'express';
import { submitIntake, getIntakes } from '../controllers/intakeController.js';

const router = express.Router();

// POST /api/intake - Store chatbot conversation data
router.post('/intake', submitIntake);

// GET /api/intake - Retrieve stored intakes (useful for checking during test reviews)
router.get('/intake', getIntakes);

export default router;
