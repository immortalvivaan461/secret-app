const express = require("express");
const app = express();

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

app.get("/secret", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    res.render("secret.ejs", { usrdata: req.session.user });
});


app.post("/login/user", async (req, res) => {
    const username = req.body.email;
    const pass = req.body.password;

    let usrdata = await USER.findOne({ email: username });

    if (!usrdata) {
        // User not found
        return res.render("login.ejs", { error: "User not found" });
    } else {
        if (pass === usrdata.password) {
            // Successful login and save the session
            req.session.user = usrdata;
            return res.redirect("/secret");
        } else {
            // Password incorrect
            return res.render("login.ejs", { error: "Incorrect password" });
        }
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send("Error logging out");
        }
        res.redirect("/");
    });
});



app.post("/register/newuser",( req, res) =>{
    const {Fname , Lname , email ,password} = req.body;
    let newusr = new USER({
        Fname: Fname,
        Lname: Lname,
        email: email,
        password: password
    })
    
    newusr.save().then((res) =>{
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