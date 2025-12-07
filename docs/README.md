# **API Testing Documentation**
_All endpoints tested using Postman on `http://localhost:3000`._

All screenshots stored in:

```
screenshots/
```

---

# 1️⃣ Create User  
### **POST** `/users`

**Body**
```json
{
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01",
  "fitnessGoal": "Lose weight"
}
```

**Response — 201**
```json
{
  "id": "<uuid>",
  "name": "Jhanvi",
  "email": "jhanvi@example.com",
  "dateOfBirth": "2003-01-01T00:00:00.000Z",
  "fitnessGoal": "Lose weight"
}
```

---

# 2️⃣ List Users  
### **GET** `/users`

**Response — 200**
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
```

---

# 3️⃣ Create Gym  
### **POST** `/gyms`

**Body**
```json
{
  "name": "NEU Fitness",
  "type": "Strength",
  "location": "Boston",
  "maxCapacity": 20
}
```

**Response — 201**
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

# 4️⃣ List Gyms  
### **GET** `/gyms`

**Response — 200**
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

# 5️⃣ Add Membership  
### **POST** `/memberships`

**Body**
```json
{
  "userId": "<user-id>",
  "gymId": "<gym-id>"
}
```

**Response — 201**
```json
{
  "id": "<uuid>",
  "userId": "<user-id>",
  "gymId": "<gym-id>",
  "joinDate": "<ISO timestamp>"
}
```

---

# 6️⃣ User → All Gyms  
### **GET** `/users/:id/gyms`

**Response — 200**
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

# 7️⃣ Gym → All Users (sorted by joinDate DESC)  
### **GET** `/gyms/:id/users`

**Response — 200**
```json
[
  {
    "id": "<user-id>",
    "name": "Jhanvi",
    "email": "jhanvi11@gmail.com",
    "dateOfBirth": "2003-01-01T00:00:00.000Z",
    "fitnessGoal": "Abs",
    "joinDate": "<timestamp>"
  }
]
```

---

# 8️⃣ Gyms With Available Spots  
### **GET** `/gyms/available/spots`

**Response — 200**
```json
[
  {
    "id": "<gym-id>",
    "name": "Boston Fitness",
    "maxCapacity": 25,
    "availableSpots": 24
  }
]
```

---

# 9️⃣ Update User  
### **PATCH** `/users/:id`

**Body**
```json
{
  "name": "Jhanvi Updated",
  "email": "jhanvi11@gmail.com",
  "fitnessGoal": "Abs"
}
```

**Response — 200**
```json
{
  "id": "<uuid>",
  "name": "Jhanvi Updated",
  "email": "jhanvi11@gmail.com",
  "dateOfBirth": "2003-01-01T00:00:00.000Z",
  "fitnessGoal": "Abs"
}
```

---

#  Screenshots
All screenshots are included inside:

```
screenshots/
```

 

