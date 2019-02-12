const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/home', (req, res, next) => {
  res.render('index2');
});

router.get('/home/profile', (req, res, next) => {
  res.render('Profile');
});

module.exports = router;
