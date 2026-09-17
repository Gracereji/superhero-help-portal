import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';
import intakeRoutes from './routes/intakeRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resilient CORS configuration: allows all local development requests
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or requests with no origin (e.g. mobile apps, curl)
    if (!origin) return callback(null, true);
    // Allow any localhost or 127.0.0.1 origin regardless of port
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Request logger for clean debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount API Routes
app.use('/api', healthRoutes);
app.use('/api', intakeRoutes);

// Root fallback route
app.get('/', (req, res) => {
  res.json({
    message: 'AURA Superhero Help Portal API is running.',
    endpoints: {
      health: '/api/health',
      intake: '/api/intake'
    }
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

// Bind to 0.0.0.0 so both IPv4 (127.0.0.1) and IPv6 (::1) localhost connections work smoothly
app.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`⚡ AURA Backend Server is running on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
  console.log('====================================================');
});
