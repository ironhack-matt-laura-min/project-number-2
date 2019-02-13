const express = require('express');
const Diary = require('../models/Diary');
const router = express.Router();
const { checkConnected } = require('../configs/middlewares');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/add-diary', (req, res, next) => {
  const user = req.user;

  const {
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink,
    diaryTitle
  } = req.body;

  console.log(req.body);

  const newDiary = new Diary({
    _owner: user,
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink,
    diaryTitle
  });

  newDiary
    .save()
    .then(() => {
      res.redirect('/new-story');
    })
    .catch(err => next(err));
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/new-story', checkConnected, (req, res, next) => {
  Diary.find({ _owner: req.user }).populate('_owner').lean()
    .then(diaries => {
      res.render('index2', { diaries });
    });
});

router.get('/profile', (req, res, next) => {
  const user = req.user
  res.render('Profile', { user });
});

module.exports = router;
