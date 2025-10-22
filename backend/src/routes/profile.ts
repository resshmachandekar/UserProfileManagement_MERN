import express from 'express';
import { body } from 'express-validator';
import auth from '../middleware/auth';
import handleValidation from '../middleware/validate';
import profiles from '../store/profiles';

const router = express.Router();

router.get('/', auth, (req: any, res: any) => {
  return res.json({ profile: req.user });
});

router.put('/', auth, [body('name').trim().isLength({ min: 1 }).withMessage('Name required'), body('email').trim().isEmail().withMessage('Invalid email')], handleValidation, (req: any, res: any) => {
  const { name, email } = req.body;
  const updated = (profiles as any).updateWithEmailChange(req.user.email, { name, email });
  if (!updated) return res.status(404).json({ message: 'User not found' });
  return res.json({ profile: updated });
});

export default router;