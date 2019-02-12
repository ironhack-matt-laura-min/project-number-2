const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const { checkConnected } = require('../configs/middlewares')





/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

<<<<<<< HEAD
/* GET Abous us page */
=======
router.post('/add-post', (req, res, next) => {
  const {
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink
  } = req.body;
  Diary.create({
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => next(err));
});
>>>>>>> faf685c0d71547a316808685d24b92da9fc78d10

router.get('/about', (req, res, next) => {
  res.render('about');
});

<<<<<<< HEAD
//GET home page - after user signed in 
router.get("/home", checkConnected, (req, res, next) => {
  res.render('index2')
})

/* GET user profile page */


router.get("/home/profile", checkConnected, (req, res, next) => {
  res.render('Profile')
})
=======
router.get('/home', (req, res, next) => {
  res.render('index2');
});

router.get('/home/profile', (req, res, next) => {
  res.render('Profile');
});
>>>>>>> faf685c0d71547a316808685d24b92da9fc78d10


module.exports = router;
