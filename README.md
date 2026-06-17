# WSpeedrun Microservices

WSpeedrun is a microservices-based backend application designed for managing speedrun submissions, game categories, leaderboards, and user authentication. The system is divided into three independent services: Auth Service, Game Service, and Run Service.

## Features

### Authentication Service

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization (ADMIN / USER)
* User Profile Retrieval

### Game Service

* Create Game (ADMIN)
* Update Game (ADMIN)
* Delete Game (ADMIN)
* Get All Games
* Get Game Details
* Create Categories (ADMIN)
* Update Categories (ADMIN)
* Delete Categories (ADMIN)
* Get Categories by Game

### Run Service

* Submit Speedrun
* View Run Details
* View Personal Runs
* Verify Run (ADMIN)
* Reject Run (ADMIN)
* Leaderboard System
* Comments System

---

## Technology Stack

### Backend

* NestJS
* TypeScript
* Prisma ORM
* Passport JWT
* Swagger

### Database

* MySQL

### Authentication

* JWT (JSON Web Token)

---

## Microservices Architecture

```text
WSpeedrun-Microservices
│
├── auth-service
│   ├── User Authentication
│   ├── Authorization
│   └── User Management
│
├── game-service
│   ├── Games
│   └── Categories
│
├── run-service
│   ├── Runs
│   ├── Leaderboard
│   └── Comments
│
├── database
│   └── wspeedrun.sql
│
└── README.md
```

Each service runs independently:

| Service      | Port |
| ------------ | ---- |
| Auth Service | 3000 |
| Game Service | 3001 |
| Run Service  | 3002 |

---

## Prerequisites

Before running this project, make sure the following software is installed:

* Node.js
* npm
* MySQL
* Git

---

# Database Setup

This project uses a single MySQL database according to the project requirements.

## Step 1 - Create Database

Open MySQL and create a database:

```sql
CREATE DATABASE wspeedrun_db;
```

## Step 2 - Import Database

Import the SQL file located at:

```text
database/wspeedrun.sql
```

Using phpMyAdmin:

1. Open phpMyAdmin.
2. Create database `wspeedrun_db`.
3. Select the database.
4. Click Import.
5. Choose `database/wspeedrun.sql`.
6. Click Go.
7. Wait until import completes.

---

# Auth Service Setup

Navigate to Auth Service:

```bash
cd auth-service
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun_db"

JWT_SECRET="your_secret_key"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run the service:

```bash
npm run start:dev
```

Swagger:

```text
http://localhost:3000/api
```

---

# Game Service Setup

Navigate to Game Service:

```bash
cd game-service
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun_db"

JWT_SECRET="your_secret_key"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run the service:

```bash
npm run start:dev
```

Swagger:

```text
http://localhost:3001/api
```

---

# Run Service Setup

Navigate to Run Service:

```bash
cd run-service
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="mysql://root:@localhost:3306/wspeedrun_db"

JWT_SECRET="your_secret_key"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run the service:

```bash
npm run start:dev
```

Swagger:

```text
http://localhost:3002/api
```

---

# Running the Entire System

## Start Auth Service

```bash
cd auth-service
npm install
npm run start:dev
```

## Start Game Service

```bash
cd game-service
npm install
npm run start:dev
```

## Start Run Service

```bash
cd run-service
npm install
npm run start:dev
```

---

# API Documentation

Swagger documentation is available at:

### Auth Service

```text
http://localhost:3000/api
```

### Game Service

```text
http://localhost:3001/api
```

### Run Service

```text
http://localhost:3002/api
```

---

# Database Tables

The system uses the following tables:

```text
users
games
run_categories
runs
comments
```

---

# Demo Flow

1. Register User
2. Login User
3. Create Game (ADMIN)
4. Create Category (ADMIN)
5. Submit Run
6. Verify Run (ADMIN)
7. View Leaderboard
8. Add Comment

---

# Contributors

* Yupriando

---

# Academic Purpose

This project was developed as part of a university coursework assignment and is intended for educational purposes only.

---

# License

This project is intended for academic and learning purposes only.
