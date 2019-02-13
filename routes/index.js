const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const { checkConnected } = require('../configs/middlewares');
const User = require("../models/User")
const app = express()


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET Abous us page */

router.get('/about', (req, res, next) => {
  res.render('about');
});

//GET home page - after user signed in 
router.get("/home", checkConnected, (req, res, next) => {
  res.render('index2')
})

/* GET user profile page */


// we are working here
router.get("/home/profile/:Id", checkConnected, (req, res, next) => {
  User.findById(req.params.Id)
    .then((user) => {
      res.render('Profile', { user })
    })
})
router.get("/home/profile/edit/:Id", checkConnected, (req, res, next) => {
  User.findById(req.params.Id)
    .then(user => {
      res.render('edit', { user })
    })
})

/* router.post('home/profile/:Id/edit', (req, res, next) => {
  const { email } = req.body
  User.findByIdAndUpdate(req.params.Id, { email })
    .then(() => {
      res.redirect("/home/profile")
    })

}) */



module.exports = router;
