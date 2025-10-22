import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import handleValidation from '../middleware/validate';
import profiles from '../store/profiles';

const router = express.Router();

router.post('/login', [body('email').trim().isEmail().withMessage('Invalid email')], handleValidation, (req: Request, res: Response) => {
  const { email } = req.body;
  // ensure profile exists in the in-memory store so auth middleware can find it
  if (!profiles.get(email)) {
    profiles.create({ name: 'New User', email });
  }
  const payload = { email };
  const secret = process.env.JWT_SECRET || 'secret';
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return res.json({ token });
});

export default router;