# Secret App 🔒

A secure "Secrets Vault" built with Node.js, Express, MongoDB, EJS templates, and Bootstrap.  
Users can **register**, **log in**, and see a fun hidden “secret fact”. Sessions remember logged-in users, and there's a **logout** button too!  

---

## 🚀 Features

- User **registration** with first/last name, email, and password  
- **Login** with validation and friendly error messages  
- Secure session-based authentication (via `express-session`)  
- Protected secret page displaying user data + secret fact  
- **Logout** functionality  

---

## 🔧 Tech Stack

- **⚙️ Backend**: Node.js, Express  
- **📦 Packages**:  
  - `express-session` for session management  
  - `mongoose` for MongoDB & schemas  
  - `ejs` for dynamic HTML templating  
- **📁 Views**: Easy-to-edit EJS templates stored in `views/`  
- **💅 Frontend**: Bootstrap 5 + custom CSS for styling  
- **🗂️ Session Store**: In-memory (default; switch to MongoDB for production)

---

## 📁 File Structure
├── models/
│ └── user.js # Mongoose schema for users
├── public/
│ ├── css/ # Custom CSS styles
│ └── js/ # Client-side JS (toggle password, etc.)
├── views/
│ ├── includes/ # Header partial
│ ├── landing.ejs # Public landing page
│ ├── login.ejs
│ ├── register.ejs
│ └── secret.ejs # Auth-protected secret page
├── app.js # Express application
├── package.json
└── package-lock.json

## ⚙️ Setup & Run

### 1. Clone and install dependencies
bash>
git clone https://github.com/immortalvivaan461/secret-app.git
cd secret-app
npm install
2. Start MongoDB
Ensure MongoDB is running (typically on mongodb://127.0.0.1:27017)

3. Run the app
bash>
node app.js
The app will be available at http://localhost:8000

🔐 Usage Flow
Landing page → click Register

Fill the form → submit → redirected to login

Login successfully → session starts → redirected to /secret

Secret page shows user info + secret fact + “Logout” button

Click Logout → session destroyed → back to landing

✅ Contribution
Feel free to suggest improvements! Here are some ideas:

Hash passwords using bcrypt

Use MongoDB session store via connect-mongo

Add password reset feature

Deploy using Heroku, Vercel, or DigitalOcean

Improve UI/UX with animations or more secret facts

## 🌐 Live Deployment

This project is deployed using **Render** – a simple and free cloud platform for hosting full-stack web apps.

🔗 **Live Link:**
Render auto-builds and deploys from this GitHub repo. Every push to `main` redeploys the app.

--
