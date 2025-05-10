# Mini E-Commerce Platform

A full-stack mini e-commerce platform built with React (frontend), Node.js/Express (backend), and PostgreSQL.

## 🚀 Setup Instructions

### 🔧 Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- Git installed

---

### 📦 Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file and configure your database connection:
   ```
   DB_HOST=localhost
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=ecommerce_db
   DB_PORT=5432
   ```

4. Start the backend server:
   ```
   npm start
   ```

---

### 💻 Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

The app should now be running at `http://localhost:5173`

---

## ✅ What's Working

- Product submission form with image, title, and description
- Tab navigation between "Product Submission" and "My Products"
- Live search bar to filter products
- Consistent and responsive layout
- Clean UI with Tailwind CSS
- Frontend and backend structure ready for integration

---

## 📌 Notes

- `.env` file is excluded from version control
- Ensure PostgreSQL is running before starting the backend
