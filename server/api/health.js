import { Router } from 'express';

const router = Router();

/**
 * GET /healthz
 * Endpoint di health check del server
 */
router.get('/healthz', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mini Twitter Backend'
  });
});

export default router;