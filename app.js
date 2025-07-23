const express = require("express");
const app = express();

const bcrypt = require("bcrypt");

const session = require("express-session");//for session creation
app.use(session({
    secret: "ifsomeoneknowsthennomoresecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: false,          // set true only for HTTPS
        httpOnly: true          // can't access via JS
    }
}));


const mongoose = require('mongoose');
const USER = require("./models/user.js")

const path = require("path");
const { error } = require("console");
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => {
        console.log("connection successfully")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userdata');

}

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.send("Error logging out.");
        }
        res.clearCookie("connect.sid"); // default cookie name used by express-session
        res.redirect("/login");
    });
});


app.post("/update", async (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const { Fname, Lname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await USER.findByIdAndUpdate(
            req.session.user._id || req.session.user,
            { Fname, Lname, email, password: hashedPassword },  // replace with hashed password if using bcrypt
            { new: true }
        );

        req.session.user = updatedUser; // update session with latest user info
        req.session.success = "Profile updated successfully!";
        res.redirect("/secret");
    } catch (err) {
        console.log(err);
        req.session.error = "Error updating profile!";
        res.redirect("/secret");
    }
});



app.get("/secret", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    // Read & clear messages
    const success = req.session.success;
    const error = req.session.error;
    req.session.success = null;
    req.session.error = null;

    res.render("secret.ejs", { usrdata: req.session.user , success , error });
});


app.post("/login/user", async (req, res) => {
    const username = req.body.email;
    const pass = req.body.password;

    let usrdata = await USER.findOne({ email: username });

    if (!usrdata) {
        // User not found
        return res.render("login.ejs", { error: "User not found" });
    } 
    const isMatch = await bcrypt.compare(pass, usrdata.password);

    if (isMatch) {
        req.session.user = usrdata;
        return res.redirect("/secret");
    } else {
        return res.render("login.ejs", { error: "Incorrect password" });
    }
});



app.post("/register/newuser", async ( req, res) =>{
    const {Fname , Lname , email ,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    let newusr = new USER({
        Fname: Fname,
        Lname: Lname,
        email: email,
        password: hashedPassword
    })
    
    await newusr.save().then((res) =>{
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })
    res.render("login.ejs" ,{error: null})
});


app.get("/login", (req, res) => {
    res.render("login.ejs", { error: null });
});


app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/", (req, res) => {
    res.render("landing.ejs")
});

app.listen(PORT, () => {
    console.log("server connected")
});