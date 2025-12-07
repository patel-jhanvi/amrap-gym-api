
# AMRAP API

A backend API for managing gyms, users, and memberships.
Built with Node.js, TypeScript, Express, Prisma, and SQLite using a Clean Architecture structure.

---

## Project Structure

```
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
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd amrap-gym-api
```

### 2. Install dependencies

```
npm install
```

### 3. Environment variables

Create a `.env` file:

```
DATABASE_URL="file:./dev.db"
PORT=3000
```

### 4. Run database migrations

```
npx prisma migrate dev --name init
```

### 5. Generate Prisma client

```
npx prisma generate
```

### 6. Run in development mode

```
npm run dev
```

Server runs at `http://localhost:3000`.

### 7. Build and run production

```
npm run build
npm start
```

---

## How to Run Tests

Tests use Jest + Supertest.

```
npm test
```

---

## API Endpoints

### Users

**POST /users**
Create a new user.
Example body:

```
{
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01",
  "fitnessGoal": "Lose weight"
}
```

**GET /users**
List all users.

---

### Gyms

**POST /gyms**
Create a gym.
Example body:

```
{
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}
```

**GET /gyms**
List all gyms.

**GET /gyms/available/spots**
List gyms sorted by available capacity (most spots first).

---

### Memberships

**POST /memberships**
Add a user to a gym.

```
{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}
```

**DELETE /memberships**
Remove a user from a gym.

```
{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}
```

**GET /users/:id/gyms**
List all gyms a user belongs to.

**GET /gyms/:id/users**
List users in a gym, sorted by join date (newest first).

---

## Deployment

### Local

Build:

```
npm run build
```

Start:

```
npm start
```

### Cloud (Railway)

Your deployed URL:

```
<YOUR_DEPLOYED_URL>
```

---

## Notes and Technical Choices

* The project follows Clean Architecture for clear separation between domain, application logic, infrastructure, and HTTP layers.
* Prisma ORM is used for strongly typed database access.
* SQLite is used for simplicity in local and cloud environments.
* Use-cases contain business logic and are framework independent.
* Controllers remain thin and only handle HTTP translation.
* Membership logic includes capacity checks and join date sorting.
* All endpoints were manually tested using Postman.
  Screenshots are available in:
  `docs/screenshots/`

---

## Author

Jhanvi Patel



