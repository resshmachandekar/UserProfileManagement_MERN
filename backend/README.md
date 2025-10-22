Backend - Express + TypeScript

Setup

1. cd backend
2. npm install
3. copy .env.example to .env and set JWT_SECRET
4. npm run dev

Available scripts

- npm run dev - starts ts-node-dev for development
- npm run build - compile TypeScript
- npm start - run built server

API Endpoints (versioned under /api/v1)

- POST /api/v1/auth/login { email } -> returns JWT for the given email (no password for demo)
- GET /api/v1/profile -> requires Authorization: Bearer <token>, returns profile
- PUT /api/v1/profile -> update profile { name, email }
- GET /api/v1/github/:username?page=&per_page= -> fetch public repos with caching

Security

- Helmet headers
- Rate limiting (express-rate-limit)
- Input validation with express-validator

Testing

- Basic Jest tests can be added under tests/ (not included by default).