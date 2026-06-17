# WSpeedrun Microservices

Backend microservices for WSpeedrun, a speedrun leaderboard platform.

## Architecture

This project is divided into three independent services:

### Auth Service (Port 3000)

Responsible for:

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization (ADMIN / USER)
- User Profile

Swagger:

http://localhost:3000/api

---

### Game Service (Port 3001)

Responsible for:

- Game Management
- Category Management
- Category Listing by Game

Swagger:

http://localhost:3001/api

---

### Run Service (Port 3002)

Responsible for:

- Run Submission
- Run Verification
- Run Rejection
- Leaderboard
- Comments

Swagger:

http://localhost:3002/api

---

## Technology Stack

- NestJS
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Swagger

---

## Database

Single MySQL Database:

```text
wspeedrun_db
```
