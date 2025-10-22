import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

import authRouter from './routes/auth';
import profileRouter from './routes/profile';
import githubRouter from './routes/github';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});
app.use(limiter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/github', githubRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'User Profile Manager API' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));