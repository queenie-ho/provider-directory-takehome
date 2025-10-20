import express from 'express';
import cors from 'cors';
import { providers } from './data.js';

const app = express();

// Type definitions
type Request = express.Request;
type Response = express.Response;
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Simulate network delay (like your original api.js)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * GET /api/providers
 * Fetch all providers
 */
app.get('/api/providers', async (req: Request, res: Response) => {
  try {
    // Simulate 500ms delay like original api.js
    await delay(500);
    
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

/**
 * GET /api/providers/:id
 * Fetch a single provider by ID
 */
app.get('/api/providers/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Simulate 500ms delay
    await delay(500);
    
    const provider = providers.find(p => p.id === id);
    
    if (!provider) {
      return res.status(404).json({ error: `Provider with id ${id} not found` });
    }
    
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provider' });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   GET http://localhost:${PORT}/api/providers`);
  console.log(`   GET http://localhost:${PORT}/api/providers/:id`);
});