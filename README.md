Task Manager – Role Based (User & Admin)

A full-stack Task Management application built using Node.js, Express, MongoDB, and React,
featuring JWT authentication, role-based access control, and a system-defined Admin.

This project was developed as part of a Backend Developer Intern assignment.

FEATURES

Authentication & Authorization
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (User / Admin)
- System-defined Admin credentials

User Features
- Create, view, update, delete own tasks
- Task fields: Title, Description, Status, Priority

Admin Features
- Login via system credentials
- View all users
- View all users’ tasks
- Delete tasks
- Delete users with cascading delete

TECH STACK

Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, dotenv
Frontend: React (Vite), Axios, React Router, CSS

PROJECT STRUCTURE
Backend: controllers, routes, models, middleware
Frontend: pages, components, api, styles

SETUP

Backend
1. npm install
2. Configure .env
3. npm run dev

Frontend
1. npm install
2. npm run dev

API ENDPOINTS

Auth
POST /api/auth/register
POST /api/auth/login

Tasks
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

Admin
GET /api/admin/users
DELETE /api/admin/users/:id

SCALABILITY NOTES
- Stateless JWT authentication
- Modular architecture

