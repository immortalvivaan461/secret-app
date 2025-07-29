# 🔐 Secret App

A simple user authentication system built with **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to register, login, update their profile, and access a protected page (`/secret`) using session-based authentication.


✨ Features
🔐 User Authentication

Sign up and log in securely with encrypted passwords.

Session-based authentication to keep users logged in.

🧑‍💼 User Profile

View personal details: name, email, and secure user ID.

Edit profile information and update password with validation.

🗝️ Post Secrets Anonymously

Users can share secrets without revealing their identity to others.

All secrets are visible to logged-in users.

✏️ Edit Own Secrets

Inline editing of posted secrets directly in the list.

Toggle between view and edit mode seamlessly.

🚫 Validation

Empty secrets are automatically filtered and not displayed.

Passwords must meet security requirements (length, character types).

🌐 Responsive Design

Mobile-friendly interface with styled UI (Bootstrap or custom CSS).

Clean layout for both profile and secret sharing.

🔒 Access Control

Edit buttons and forms are only available to the secret's owner.

Other users can read but not modify or delete secrets.

📂 Database Integration

MongoDB stores users and their secrets with unique IDs.

Seamless interaction using Mongoose.



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


## 🚀 Live Demo
https://secret-app-final.onrender.com/
