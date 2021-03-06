const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);
router.get('/github', passport.authenticate("github"));

router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/login',
    successRedirect: "/dashboard", 
}));


//passport handles logout, and destroys session made by serializeUser
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
