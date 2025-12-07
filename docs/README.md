AMRAP API

A backend service for managing gyms, users, and memberships.
Built with Node.js, TypeScript, Express, Prisma (SQLite), and structured using Clean Architecture for maintainability and clarity.

Project Structure
src/
 ├── domain/               # Entities and repository interfaces
 ├── application/          # Use-cases, DTOs, domain errors
 ├── infrastructure/       # Database, Prisma client, repository implementations
 └── interface/
       └── http/           # Controllers, routes, server configuration

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


On Railway, the DATABASE_URL is configured in the dashboard (not from .env).

4. Run database migrations
npx prisma migrate dev --name init

5. Generate Prisma Client
npx prisma generate

6. Start development server
npm run dev


Server runs at:

http://localhost:3000

7. Build & start production server
npm run build
npm start

API Documentation (Swagger)

Interactive API docs available at:

https://amrap-gym-api-production.up.railway.app/docs


Swagger is generated using swagger-ui-express and swagger-jsdoc.
All routes include detailed OpenAPI annotations.

API Endpoints
Users
POST   /users           # Create user
GET    /users           # List users
GET    /users/:id       # Get user by ID
GET    /users/:id/gyms  # List gyms a user belongs to
PUT    /users/:id       # Update user

Gyms
POST   /gyms                     # Create gym
GET    /gyms                     # List gyms
GET    /gyms/:id                 # Get gym by ID
GET    /gyms/:id/users           # Users in a gym
GET    /gyms/available/spots     # Gyms sorted by available capacity

Memberships
POST    /memberships     # Add user to gym
DELETE  /memberships     # Remove user from gym

Deployment
Local
npm run build
npm start

Production (Railway)

Base URL:

https://amrap-gym-api-production.up.railway.app/


Example:

GET https://amrap-gym-api-production.up.railway.app/users

Technical Decisions

Clean Architecture with clear domain, application, infrastructure, and interface layers

Prisma ORM for type-safe database access

SQLite for simple local + cloud compatibility

Use-cases contain all business logic

Controllers remain thin and framework-only

Membership rules:

Capacity validation

Join-date sorting

Swagger documentation for all routes

Postman validation for every endpoint

Author

Jhanvi Patel
