const express = require('express');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const { checkConnected } = require('../configs/middlewares')





/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET Abous us page */

router.get('/about', (req, res, next) => {
  res.render('about')
})

//GET home page - after user signed in 
router.get("/home", checkConnected, (req, res, next) => {
  res.render('index2')
})

/* GET user profile page */


router.get("/home/profile", checkConnected, (req, res, next) => {
  res.render('Profile')
})


module.exports = router;
