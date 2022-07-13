require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./passport-google"); //google oauth js file import
require("./passport-facebook"); //facebook oauth js file import
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//session is required for google auth
app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: false,
  })
);
//passport initialize methods
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

//google auth routes
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/success",
  })
);

//facebook auth routes
app.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/failed",
    successRedirect: "/success",
  })
);

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.get("/success", isLoggedIn, (req, res) => {
  // console.log(req.user)
  // res.send("FB login successful")
  res.render("success", {
    name: req.user.displayName,
    email: req.user.emails[0].value,
    pic: req.user.photos[0].value,
  });
});

app.get("/failed", (req, res) => {
  res.send("Failed");
});

app.get("/logout", function (req, res, next) {
req.session.destroy(function (err) {
    if (!err) {
        console.log("Successfully logged out..")
        res.status(200).clearCookie('connect.sid', {path: '/'}).redirect("/");
    } else {
        // handle error case...
        res.status(400).json({message: "Not able to logout!"})
    }

});
});

//safe page
app.use("/", (req, res, next) => {
  res.render("index");
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
