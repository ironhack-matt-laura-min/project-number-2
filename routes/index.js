const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const { checkConnected } = require('../configs/middlewares');
const User = require("../models/User")


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

<<<<<<< HEAD
/* GET Abous us page */
=======
router.post('/add-diary', (req, res, next) => {
  const user = req.user

  const {
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink
  } = req.body;

  console.log(req.body)

  const newDiary = new Diary({
    _owner: user,
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink
  })

  newDiary.save()
    .then(() => {
      res.redirect('/home');
    })
    .catch(err => next(err));
});
>>>>>>> 9bc17d9e97f336c2a9bb7aaeb84855d7f9d3cbbb

router.get('/about', (req, res, next) => {
  res.render('about');
});

//GET home page - after user signed in 
router.get("/home", checkConnected, (req, res, next) => {
  res.render('index2')
})

/* GET user profile page */


router.get("/home/profile", checkConnected, (req, res, next) => {
  res.render('Profile')
})


module.exports = router;
