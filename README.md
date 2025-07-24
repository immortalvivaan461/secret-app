# 🔐 Secret App

A simple user authentication system built with **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to register, login, update their profile, and access a protected page (`/secret`) using session-based authentication.

## 🚀 Live Demo

👉 https://secret-app-final.onrender.com/

---

## 🛠 Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- EJS templating
- express-session
- bcrypt for password hashing

---

## 📂 Folder Structure

.
├── app.js
├── models/
│ └── user.js
├── views/
│ ├── landing.ejs
│ ├── login.ejs
│ ├── register.ejs
│ └── secret.ejs
├── public/
├── package.json
└── .env


---

## ⚙️ Environment Variables

Create a `.env` file and add your MongoDB URI:

...env
MONGODB_URI=mongodb+srv://todo-user:Vivaan%40461@cluster0.scv4j7i.mongodb.net/secretAppDB?retryWrites=true&w=majority



🧪 Running Locally
git clone https://github.com/immortalvivaan461/secret-app.git
cd secret-app
npm install
npm start
Visit http://localhost:8000 in your browser.


✍️ Features
Register new users

Login with secure password verification

Session-based authentication

Profile update route

Protected route /secret

## 🚀 Live Demo
https://secret-app-final.onrender.com/
