# Intern Task Full Stack App

## Setup Instructions

### Prerequisites
- Node.js 18+
- MySQL 8+
- npm or yarn

### Backend Setup
1. cd backend
2. npm install
3. Create .env file with:
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=your_user
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=intern_task
   JWT_SECRET=your_secret
4. npm run start:dev

### Frontend Setup
1. cd frontend
2. npm install
3. npm run dev

### Database
- Ensure MySQL is running and create the database as per .env.

## Features
- User registration/login with JWT
- Protected dashboard
- Profile management