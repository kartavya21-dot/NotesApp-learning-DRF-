📝 Notes App
Check it out: https://notes-app-learning-drf.vercel.app/

A full-stack Notes Application built with Django REST Framework (DRF) as the backend and React as the frontend. This app allows users to create, edit, delete, and manage their notes with authentication support.

🚀 Features
Backend (Django REST Framework)

JWT Authentication using SimpleJWT (login, signup, logout, token refresh).

CRUD APIs for Notes (Create, Read, Update, Delete).

User-specific notes (each user can only access their own notes).

RESTful API endpoints with proper permissions and validations.

CORS support for React frontend integration.

Frontend (React)

User authentication with login and signup forms.

Token-based session management using localStorage.

Create, view, edit, and delete notes.

Responsive UI with simple and clean design.

Logout functionality to clear tokens and end session.

🛠️ Tech Stack

Backend: Django, Django REST Framework, SimpleJWT, Django CORS Headers

Frontend: React, Axios, React Router

Database: SQLite (can be swapped with PostgreSQL/MySQL)

📂 Project Structure
notes-app/
│── backend/   # Django REST Framework backend
│── frontend/  # React frontend

⚡ How It Works

User registers or logs in → receives JWT tokens (access & refresh).

Tokens are stored in the browser (localStorage) and sent with each API request.

Authenticated users can create, edit, and delete their personal notes.

Frontend dynamically updates based on backend API responses.
