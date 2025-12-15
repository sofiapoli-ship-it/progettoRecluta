import { Router } from 'express';

const router = Router();

/**
 * GET /api/healthz
 */
router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mini Twitter Backend'
  });
});

export default router;