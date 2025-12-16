//imports
import { Router } from 'express';

//consts
const router = Router();

//GET ROUTES
//GET health
router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mini Twitter Backend'
  });
});

export default router;