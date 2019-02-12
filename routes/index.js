const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/home', (req, res, next) => {
  Diary.find()
    .then((diaries) => {
      console.log(diaries)
      res.render('index2', { diaries });
    })
});

router.get('/home/profile', (req, res, next) => {
  res.render('Profile');
});

module.exports = router;
