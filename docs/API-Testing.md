# AMRAP Gym API — Postman Testing Documentation
_All endpoints tested locally via Postman on `http://localhost:3000`_

Date: Dec 2025  
Author: Jhanvi Patel  
Status: All endpoints successfully tested ✔

Test Summary
Endpoint	Method	Status	Screenshot
Create User	POST /users	201	(screenshot in docs/screenshots/)
List Users	GET /users	200	(screenshot)
Create Gym	POST /gyms	201	(screenshot)
List Gyms	GET /gyms	200	(screenshot)
Add Membership	POST /memberships	201	(screenshot)
User's Gyms	GET /users/:id/gyms	200	(screenshot)
Gym Users (sorted by join date)	GET /gyms/:id/users	200	(screenshot)
Available Gyms	GET /gyms/available/spots	200	(screenshot)
Update User	PUT /users/:id	200	(screenshot)

All screenshots are stored in:
docs/screenshots/

1. Create User

POST /users

Request:

{
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01",
  "fitnessGoal": "Lose weight"
}


Expected 201 Response:

{
  "id": "<uuid>",
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01T00:00:00.000Z",
  "fitnessGoal": "Lose weight"
}

2. List Users

GET /users

Expected 200 Response:

[
  {
    "id": "<uuid>",
    "name": "Jhanvi",
    "email": "jhanvi@example.com",
    "dateOfBirth": "2003-01-01T00:00:00.000Z",
    "fitnessGoal": "Lose weight"
  }
]

3. Create Gym

POST /gyms

Request:

{
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}


Expected 201 Response:

{
  "id": "<uuid>",
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}

4. List Gyms

GET /gyms

Expected 200 Response:

[
  {
    "id": "<uuid>",
    "name": "NEU Fitness",
    "type": "Strength",
    "location": "Boston",
    "maxCapacity": 20
  }
]

5. Add Membership

POST /memberships

Request:

{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}


Expected 201 Response:

{
  "id": "<uuid>",
  "userId": "<user-id>",
  "gymId": "<gym-id>",
  "joinDate": "<timestamp>"
}

6. List All Gyms of a User

GET /users/:id/gyms

Expected 200 Response:

[
  {
    "id": "<gym-id>",
    "name": "NEU Fitness",
    "type": "Strength",
    "location": "Boston",
    "maxCapacity": 20
  }
]

7. List All Users of a Gym (sorted by join date)

GET /gyms/:id/users

Expected 200 Response:

[
  {
    "userId": "<user-id>",
    "name": "Jhanvi",
    "email": "jhanvi@example.com",
    "joinDate": "<timestamp>"
  }
]


(The backend sorts descending by joinDate.)

8. List Available Gyms (capacity remaining)

GET /gyms/available/spots

Expected 200 Response:

[
  {
    "id": "<gym-id>",
    "name": "NEU Fitness",
    "availableSpots": <number>
  }
]

9. Update User

PUT /users/:id

Request:

{
  "name": "Jhanvi Updated",
  "email": "jhanvi_new@example.com",
  "fitnessGoal": "Build Muscle"
}


Expected 200 Response:

{
  "id": "<uuid>",
  "name": "Jhanvi Updated",
  "email": "jhanvi_new@example.com",
  "dateOfBirth": "2003-01-01T00:00:00.000Z",
  "fitnessGoal": "Build Muscle"
}

Notes

All endpoints returned correct status codes and validation.

Join-date sorting, capacity calculation, and membership business rules were verified.

API behavior matches the Clean Architecture use-case flow.

All database updates were validated through Prisma Studio and Postman.

