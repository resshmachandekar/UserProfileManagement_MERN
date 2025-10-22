import express from 'express';
import { param, query } from 'express-validator';
import { fetchRepos } from '../services/githubService';
import handleValidation from '../middleware/validate';

const router = express.Router();

router.get('/:username', [
  param('username').trim().isLength({ min: 1 }).withMessage('username required'),
  query('page').optional().toInt().isInt({ min: 1 }),
  query('per_page').optional().toInt().isInt({ min: 1, max: 100 })
], handleValidation, async (req: any, res: any) => {
  const { username } = req.params;
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 30;
  try {
    const repos = await fetchRepos(username, page, per_page);
    return res.json({ repos });
  } catch (err: any) {
    return res.status(500).json({ message: 'Failed to fetch repos', error: err.message });
  }
});

export default router;