AMRAP API

A backend API for managing gyms, users, and memberships.
Built with Node.js, TypeScript, Express, Prisma, and SQLite using a Clean Architecture structure.

Project Structure
src/
 ├── domain/
 │     ├── entities/
 │     ├── repositories/
 │
 ├── application/
 │     ├── dtos/
 │     ├── use-cases/
 │     └── errors/
 │
 ├── infrastructure/
 │     ├── database/
 │     └── prisma/
 │
 └── interface/
       ├── http/
       │     ├── controllers/
       │     └── routes/
       └── server.ts

Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd amrap-gym-api

2. Install dependencies
npm install

3. Environment variables

Create a .env file for local development:

DATABASE_URL="file:./prisma/dev.db"
PORT=3000


Note: On Railway, the DATABASE_URL is configured in the dashboard and not read from this file.

4. Run database migrations
npx prisma migrate dev --name init

5. Generate Prisma client
npx prisma generate

6. Run in development mode
npm run dev


Server runs at:

http://localhost:3000

7. Build and run production
npm run build
npm start

How to Run Tests

Uses Jest + Supertest:

npm test

API Endpoints
Users

POST /users
Create a new user.

Example:

{
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01",
  "fitnessGoal": "Lose weight"
}


GET /users
List all users.

Gyms

POST /gyms

{
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}


GET /gyms
List gyms.

GET /gyms/available/spots
List gyms sorted by available capacity.

Memberships

POST /memberships

{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}


DELETE /memberships

{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}


GET /users/:id/gyms
List all gyms a user belongs to.

GET /gyms/:id/users
List users in a gym sorted by join date (newest first).

Deployment
Local
npm run build
npm start

Cloud (Railway)

Base URL:

https://amrap-gym-api-production.up.railway.app/


Example:

GET https://amrap-gym-api-production.up.railway.app/users

Notes and Technical Choices

Clean Architecture for separation of concerns (domain, application, infrastructure, interface).

Prisma ORM for typed and reliable DB access.

SQLite chosen for simplicity and portability.

Business logic lives in use-cases, keeping controllers thin.

Membership logic includes capacity checks and join date ordering.

All endpoints validated using Postman (screenshots available in docs/screenshots/).

Author

Jhanvi Patel