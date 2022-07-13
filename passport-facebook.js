const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/facebook/callback",
    profileFields   : ['id','displayName','name','gender','picture.type(large)','email'],
  },
  function(accessToken, refreshToken, profile, cb) {
    //can be used to verify the user using token sent by Facebook
    // console.log(accessToken)
    console.log(profile)
    return cb(null,profile)
  }
));

//for the cookie session
passport.serializeUser((user,done) => { //gets the user data from google in json
    done(null,user)
})
passport.deserializeUser((user,done) => { //stores the user data in req.user variable
    done(null,user)
})