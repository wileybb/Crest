const router = require("express").Router();
const userRoutes = require("./user");
const db = require("../../models");
const passport = require("../../config/passport");
var url = require("url")
var isAuthenticated = require("../../config/middleware/isAuthenticated");
//const socketIOClient =require("socket.io-client");
//var socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops');
// const jwt =require('jsonwebtoken');

//passport.authenticate("local")
router.post("/login", passport.authenticate("local"), function (req, res) {
    console.log("Login entered")

    res.status(200).send({"id":req.user.dataValues.id});

    // if(req.user){
    //res.redirect(url.format({pathname:"/user"}));
   //res.json("/home");
//    res.json(req.user.dataValues.username).send("User Logged in");
    // console.log(req.user.dataValues.username)
    // }
    //res.redirect("/home")
    // req.login(req.user, function(err) {
    //     if (err) { return next(err); }
    //     return res.redirect('/home');
    //   });
  });

// router.post("/login", passport.authenticate("local", {successRedirect:"/home", failureRedirect:"/login", failureFlash: true}))

router.post("/signup", function(req,res){
    console.log(req.body);
    if(req.body.username && req.body.password && req.body.email){


        db.User.create({username: req.body.username.trim(),
        password: req.body.password.trim(),
        email: req.body.email.trim()}).then(function(dbUser){

            db.Portfolio.create({symbol: "initial"});

            console.log("Uesr Created");
            res.status(200).send("Signup Successful");
            //res.redirect('/login')
        }).catch(function (err){
            res.json(err);
        })
    }else{
        res.redirect('/signup');
    }
});


router.get("/", function(req,res){
    console.log("get /user route hit");
//         // Subscribe to topics (i.e. appl,fb,aig+)
     
        //  socket.on('connect', () => {
        //     socket.emit('subscribe', 'googl,appl,fb');
        //     socket.on('message', (message) => {
        //         console.log(message);
        //        })
        //  })
//         socket.emit('subscribe', 'googl,appl,fb')
//         // Unsubscribe from topics (i.e. aig+)
//         //socket.emit('unsubscribe', 'aig+')
//       })
//       socket.on('message', (message) => {
//         console.log(message);})
 //      })
})



router.get("/logout", function(req,res){
    req.logout();
    console.log("logging out");
    //res.redirect("/login");
    res.status(200).send('User Signed out');
})

// router.get("/user",  isAuthenticated, function(req, res) {
//     //console.log(req.user);
//     console.log("home get route")
//     db.User.findOne({ where: { email: req.user.email } }).then(function(user) {
//       // console.log(user.admin);
//       console.log(user);
//       res.json(user);
//     //   if(user.admin){
//     //     console.log("inside table")
//     //     res.render("home", {
//     //       user: req.user.name
//     //     });
//     //   }else {
//     //     res.redirect("/employee")
//     //   }
//     });
//   });

// router.get("/user/home", isAuthenticated, function(req,res){
//     res.redirect("/home")
// })

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
