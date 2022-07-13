const googleStrategy = require("passport-google-oauth2").Strategy
const passport = require("passport")

passport.use(new googleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback:true,
    // scope: ["profile","email"]
},
function(req,accessToken,refreshToken,profile,callback){
    //can be used to verify the user using token sent by Facebook
    // console.log(accessToken)
    console.log(profile)
    return callback(null,profile);
}))

//for the cookie session
passport.serializeUser((user,done) => { //gets the user data from google in json
    done(null,user)
})
passport.deserializeUser((user,done) => { //stores the user data in req.user variable
    done(null,user)
})