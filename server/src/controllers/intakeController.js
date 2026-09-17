/**
 * Intake Routes
 * Handles:
 * 1. AURA advice generation
 * 2. Final grievance submission
 * 3. Reading stored intakes
 */

import express from 'express';

import {
  getAuraAdvice,
  submitIntake,
  getIntakes
} from '../controllers/intakeController.js';

const router = express.Router();


// Generate AURA advice
// Does NOT submit the grievance or send email
router.post('/aura-advice', getAuraAdvice);


// Submit final grievance
// Creates tracking ID and sends emails
router.post('/intake', submitIntake);


// Get stored intakes
router.get('/intakes', getIntakes);


export default router;