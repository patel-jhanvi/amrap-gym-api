AMRAP API

A backend service for managing gyms, users, and memberships.
Built with Node.js, TypeScript, Express, Prisma (SQLite) and structured using Clean Architecture to ensure separation of concerns and maintainable code.

Project Structure
src/
 ├── domain/               # Entities and repository interfaces
 ├── application/          # Use-cases, DTOs, domain errors
 ├── infrastructure/       # Database, Prisma client, repository implementations
 └── interface/
       └── http/           # Controllers, routes, server configuration


This structure cleanly separates domain logic from HTTP, persistence, and frameworks.

Setup Instructions
1. Clone the repository
git clone https://github.com/patel-jhanvi/amrap-gym-api.git
cd amrap-gym-api

2. Install dependencies
npm install

3. Environment variables (local only)

Create a .env file:

DATABASE_URL="file:./prisma/dev.db"
PORT=3000


On Railway, the DATABASE_URL is configured directly in the environment variables section.

4. Run database migrations
npx prisma migrate dev --name init

5. Generate Prisma Client
npx prisma generate

6. Start development server
npm run dev


App runs at:

http://localhost:3000

7. Build & start production server
npm run build
npm start

API Endpoints
Users

POST /users — Create user
GET /users — List users
GET /users/:id — Get user by ID
GET /users/:id/gyms — List gyms a user belongs to
PUT /users/:id — Update a user

Gyms

POST /gyms — Create gym
GET /gyms — List gyms
GET /gyms/:id — Get gym by ID
GET /gyms/:id/users — Users in a gym
GET /gyms/available/spots — Gyms sorted by available capacity

Memberships

POST /memberships — Add user to gym
DELETE /memberships — Remove user from gym

Deployment
Local
npm run build
npm start

Production (Railway)

Base URL:

https://amrap-gym-api-production.up.railway.app/


Example:

GET https://amrap-gym-api-production.up.railway.app/users

Notes & Technical Decisions

Clean Architecture: Business logic lives in use-cases; controllers remain thin.

Prisma ORM: Strongly typed schema with migrations and query safety.

SQLite: Simple, portable database for local and cloud environments.

Domain-first design: Entities, repository interfaces, and use-cases enforce separation of concerns.

Membership logic: Capacity validation and join-date ordering implemented in use-cases.

Testing: Endpoints manually validated with Postman.

Author

Jhanvi Patel