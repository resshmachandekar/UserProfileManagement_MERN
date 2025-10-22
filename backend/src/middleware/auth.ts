import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import profiles from '../store/profiles';

interface JwtPayload { email?: string }

export default function authMiddleware(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid Authorization header' });
  const token = parts[1];
  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const payload = jwt.verify(token, secret) as JwtPayload;
    if (!payload?.email) return res.status(401).json({ message: 'Invalid token payload' });
    const user = profiles.get(payload.email);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}