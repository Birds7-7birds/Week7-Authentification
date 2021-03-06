const express = require("express");
const router = express.Router();
var session = require('express-session')
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});


//req.user is passed to here which stores all the information about the user
//passport middleware added user variable to request
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (req.user.id == 0){
    res.redirect('/admin')
  } else {
    res.render("dashboard", {
    user: req.user,
  });
  }
  
});

router.get('/admin', ensureAuthenticated, (req, res) => {req.sessionStore.all((err, sessions)=>{
  if (req.user.id != 0){
  res.redirect("/dashboard")
  }
  let theHTML = [];
  for ( i in sessions) {
    theHTML.push({session: i, user: sessions[i].passport.user})

  }
  res.render('admin',
  {
    theHTML: theHTML
  })
})})

router.get('/admin/p/:id', (req, res) => {
  let sessionToDel = req.params
  console.log("---------------------------------------p")
  console.log(sessionToDel.id)
  delete req.session.sessionToDel;
  console.log("---------------------------------------p")
  let dd = req.sessionStore.sessions
  let sid = sessionToDel.id

  // i have tried alot of things here but it seems it wont recognize destroy as a function. regardless of implimentation
  delete dd[sessionToDel.id]


  res.redirect('/admin')
})



module.exports = router;
