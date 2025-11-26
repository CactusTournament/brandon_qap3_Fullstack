# User Management System

## Description
This is a User Management System built with **Node.js**, **Express**, and **EJS**. It supports:

- User registration and login with password hashing (bcrypt)
- Session-based authentication
- Role-based access: admin vs regular users
- Flash messages for login, signup, and logout (displayed as animated popups)
- Email validation to enforce standard domains (.com, .ca, .net, etc.)
- A collapsible user card that remembers its state across pages
- Logout functionality

## Features

- **Registration:** Users can register with a unique username and email. Passwords must be at least 8 characters long.
- **Login:** Authenticates users with email and hashed password comparison.
- **Role-Based Access:** Admin users can view all registered users; regular users only see their dashboard.
- **Error Handling:** Validation and error messages displayed via popups for a consistent user experience.
- **Security:** Passwords are hashed using bcrypt. No plaintext passwords are stored.

## Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>

Install dependencies:
npm install

Start the server:
npm start

Open your browser:
http://localhost:3000


Project Structure
-index.js – Main application entry point, sets up Express, sessions, routes, and middleware.
-routes/auth.js – Handles signup, login, and logout routes.
-routes/home.js – Handles home, landing, and admin pages.
-models/users.js – In-memory user storage and helper functions.
-views/ – EJS templates for pages and partials (user card, footer, etc.).
-public/ – Static assets (CSS, images, JS for popup animations).

Author: Brandon Maloney
Date: November 26, 2025