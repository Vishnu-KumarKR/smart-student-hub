# SmartHub - Student Management System

A modern and professional Student Management Web Application built with the MERN stack (MongoDB, Express, React, Node.js). 

## 🚀 Features

- **Authentication Module**: Secure JWT-based login authentication.
- **Modern Dashboard**: Responsive, sleek UI with Material UI, featuring dark/light mode and statistical charts (Recharts).
- **Student Management**: Full CRUD operations for managing student records.
- **Advanced Table**: Search, filter, sort, and pagination support.
- **Form Validation**: Comprehensive validations for new student entries.
- **REST APIs**: Full backend functionality with robust error handling.

## 🛠️ Tech Stack

**Frontend:**
- React.js + Vite
- Material UI (MUI)
- React Router DOM
- Axios
- Recharts
- React Hot Toast

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcryptjs

## 📸 Screenshots

<p align="center">
  <img src="./frontend/screenshots/Login%20Page.png" width="800" alt="Login Page">
  <br>
  <em>Modern Glassmorphic Login</em>
</p>

<p align="center">
  <img src="./frontend/screenshots/Dashboard%20Layout.png" width="800" alt="Dashboard">
  <br>
  <em>Premium Dashboard Analytics</em>
</p>

<p align="center">
  <img src="./frontend/screenshots/Student%20Grid%20Table.png" width="800" alt="Student Management">
  <br>
  <em>Advanced Student Directory</em>
</p>

<p align="center">
  <img src="./frontend/screenshots/Add%20Student%20Form.png" width="800" alt="Add/Edit Form">
  <br>
  <em>Sleek Add & Edit Student Form</em>
</p>

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or remote URI)

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd smart-student-hub
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install

# Environment Variables
# The backend/.env file is already provided with defaults:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/student-management
# JWT_SECRET=supersecretjwtkey12345

# Start the backend server
npm run dev
\`\`\`
*(Server will run on http://localhost:5000)*

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install

# Start the React app
npm run dev
\`\`\`
*(App will run on http://localhost:5173)*

### Usage

1. Open the app in your browser.
2. Since there are no initial users, you can create one via Postman/cURL:
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@example.com","password":"password123"}'
\`\`\`
3. Log in using `admin@example.com` and `password123`.

## 🚢 Deployment Guidelines

### Backend (Render / Railway)
1. Push your code to GitHub.
2. Link the repository to Render/Railway.
3. Set the root directory to `backend`.
4. Set the Build Command: `npm install`
5. Set the Start Command: `node server.js`
6. Add environment variables (`MONGODB_URI`, `JWT_SECRET`, etc.).

### Frontend (Vercel / Netlify)
1. Link your repository to Vercel/Netlify.
2. Set the root directory to `frontend`.
3. Framework Preset: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Ensure your backend URL is properly updated in `frontend/src/services/api.js`.

---

**Developed for technical assignment.**
