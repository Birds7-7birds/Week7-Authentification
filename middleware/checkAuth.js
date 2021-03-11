module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {  //passport defined func - checks if current user has a session
      return next(); //next() gives permission to move foward with code
    }
    res.redirect("/auth/login"); //if not authenticated, send to login page
  },
  forwardAuthenticated: function (req, res, next) {
    //so logged in users do not go to login page, go straight to dashboard page
    //user should not be able to login twice!
    if (!req.isAuthenticated()) {
      //if not logged in, call next() and send to login page
      return next();
    }
    res.redirect("/dashboard");
  },
};
