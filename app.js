const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const USER = require("./models/user.js");
const app = express();
const PORT = process.env.PORT || 8000;

// Session setup
app.use(session({
    secret: "ifsomeoneknowsthennomoresecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    }
}));

// Middleware and View Engine
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes

app.get("/", (req, res) => res.render("landing.ejs"));

app.get("/register", (req, res) => res.render("register.ejs"));

app.get("/login", (req, res) => res.render("login.ejs", { error: null }));

app.post("/register/newuser", async (req, res) => {
    const { Fname, Lname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        let newusr = new USER({ Fname, Lname, email, password: hashedPassword });
        await newusr.save();
        res.render("login.ejs", { error: null });
    } catch (err) {
        console.log(err);
        res.render("register.ejs");
    }
});

app.post("/login/user", async (req, res) => {
    const { email, password } = req.body;
    const usrdata = await USER.findOne({ email });
    if (!usrdata) return res.render("login.ejs", { error: "User not found" });

    const isMatch = await bcrypt.compare(password, usrdata.password);
    if (isMatch) {
        req.session.user = usrdata;
        return res.redirect("/secret");
    } else {
        return res.render("login.ejs", { error: "Incorrect password" });
    }
});

app.get("/secret", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    const success = req.session.success;
    const error = req.session.error;
    req.session.success = null;
    req.session.error = null;
    res.render("secret.ejs", { usrdata: req.session.user, success, error });
});

app.post("/update", async (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    const { Fname, Lname, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await USER.findByIdAndUpdate(
            req.session.user._id || req.session.user,
            { Fname, Lname, email, password: hashedPassword },
            { new: true }
        );
        req.session.user = updatedUser;
        req.session.success = "Profile updated successfully!";
        res.redirect("/secret");
    } catch (err) {
        console.log(err);
        req.session.error = "Error updating profile!";
        res.redirect("/secret");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.send("Error logging out.");
        }
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
