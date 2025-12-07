# AMRAP Gym API — Postman Testing Documentation
_All endpoints tested locally via Postman on `http://localhost:3000`_

Date: Dec 2025  
Author: Jhanvi Patel  
Status: All endpoints successfully tested ✔

---

# 📌 Test Summary

| Endpoint | Method | Status | Screenshot |
|---------|--------|--------|-------------|
| Create User | POST `/users` | ✔ 201 | create_user.png |
| List Users | GET `/users` | ✔ 200 | list_users.png |
| Create Gym | POST `/gyms` | ✔ 201 | create_gym.png |
| List Gyms | GET `/gyms` | ✔ 200 | list_gyms.png |
| Add Membership | POST `/memberships` | ✔ 201 | add_membership.png |
| User's Gyms | GET `/users/:id/gyms` | ✔ 200 | user_gyms.png |
| Available Gyms | GET `/gyms/available/spots` | ✔ 200 | available_spots.png |
| Update User | PUT `/users/:id` | ✔ 200 | update_user.png |

---
ALL SCREENSHOTS are in doc/screenshots/*
# 1️⃣ **Create User**
### **POST** `/users`

#### Request Body
```json
{
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01",
  "fitnessGoal": "Lose weight"
}
```

#### Expected Response — 201 Created
```json
{
  "id": "<uuid>",
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01T00:00:00.000Z",
  "fitnessGoal": "Lose weight"
}


---

# 2️⃣ **List Users**
### **GET** `/users`

#### Expected Response — 200 OK
```json
[
  {
    "id": "<uuid>",
    "name": "Jhanvi",
    "email": "jhanvi@example.com",
    "dateOfBirth": "2003-01-01T00:00:00.000Z",
    "fitnessGoal": "Lose weight"
  }
]


---

# 3️⃣ **Create Gym**
### **POST** `/gyms`

#### Request Body
```json
{
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}
```

#### Expected Response — 201 Created
```json
{
  "id": "<uuid>",
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}
```



---

# 4️⃣ **List Gyms**
### **GET** `/gyms`

#### Expected Response — 200 OK
```json
[
  {
    "id": "<uuid>",
    "name": "NEU Fitness",
    "type": "Strength",
    "location": "Boston",
    "maxCapacity": 20
  }
]
```



---

# 5️⃣ **Add Membership**
### **POST** `/memberships`

#### Request Body
```json
{
  "userId": "<existing-user-id>",
  "gymId": "<existing-gym-id>"
}
```

#### Expected Response — 201 Created
```json
{
  "id": "<uuid>",
  "userId": "<user-id>",
  "gymId": "<gym-id>",
  "joinDate": "<timestamp>"
}
```

---

# 6️⃣ **List All Gyms of a User**
### **GET** `/users/:id/gyms`

#### Expected Response — 200 OK
```json
[
  {
    "id": "<gym-id>",
    "name": "NEU Fitness",
    "type": "Strength",
    "location": "Boston",
    "maxCapacity": 20
  }
]
```



---

# 7️⃣ **List Available Gyms (Capacity Remaining)**
### **GET** `/gyms/available/spots`

#### Expected Response — 200 OK
```json
[
  {
    "id": "<gym-id>",
    "name": "NEU Fitness",
    "availableSpots": <number>
  }
]
```



---

# 8️⃣ **Update User**
### **PUT** `/users/:id`

#### Request Body
```json
{
  "name": "Jhanvi Updated",
  "email": "jhanvi_new@example.com",
  "fitnessGoal": "Build Muscle"
}
```

#### Expected Response — 200 OK
```json
{
  "id": "<uuid>",
  "name": "Jhanvi Updated",
  "email": "jhanvi_new@example.com",
  "dateOfBirth": "2003-01-01T00:00:00.000Z",
  "fitnessGoal": "Build Muscle"
}
```


---

# Note

All endpoints returned correct:

- Status codes  
- Validation  
- Error handling  
- Clean Architecture use-case flow  
- Prisma DB updates  
- Membership logic  
- Capacity check logic  

This API passed full functional testing successfully.
