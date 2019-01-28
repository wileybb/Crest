const router = require("express").Router();
const userRoutes = require("./user");
const db = require("../../models");
const passport = require("../../config/passport");
var isAuthenticated = require("../../config/middleware/isAuthenticated");
// const jwt =require('jsonwebtoken');


router.post("/login", passport.authenticate("local"), function (req, res) {
    res.redirect("/home")
  });

router.post("/signup", function(req,res){
    console.log(req.body);
    if(req.body.username && req.body.password && req.body.email){
        db.User.create({username: req.body.username.trim(),
        password: req.body.password.trim(),
        email: req.body.email.trim()}).then(function(dbUser){
            console.log(dbuser);
            res.redirect('/login')
        }).catch(function (err){
            res.json(err);
        })
    }else{
        res.redirect('/signup');
    }
});

// app.post("/api/users", function (req, res) {
//     console.log(req.body);
//     db.User.create(req.body).then(function (dbUser) {
//       //res.json(dbUser);
//       res.redirect('/')
//     }).catch(function (err) {
//       //console.log(err);
//       res.json(err);
//       //res.redirect('/')
//       // res.status(422).json(err.errors[0].message);
//     });
//   });


 module.exports = router;
