User Profile Manager - Fullstack Coding Challenge

Overview

This repository provides a small fullstack application (Node.js + Express + TypeScript backend, React + TypeScript frontend) that demonstrates:
- Simulated authentication (JWT)
- User profile view/edit persisted to an in-memory store
- Integration with the GitHub public API to fetch repositories with caching
- Basic security (helmet, rate limiting) and input validation

Folders

- backend: Express + TypeScript API (api versioning under /api/v1)
- frontend: React + TypeScript (Vite)

Quick start

1) Backend
   cd "e:\\Reshma\\Interview\\MERN project\\backend"
   npm install
   copy .env.example .env (or `cp .env.example .env` on macOS/Linux)
   npm run dev

2) Frontend
   cd "e:\\Reshma\\Interview\\MERN project\\frontend"
   npm install
   npm run dev

Notes

- This is a simple project scaffold focused on clean structure and basic features for the coding challenge.
- See individual READMEs in backend/ and frontend/ for details.