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

  function difficultyToString(difficulty) {
    let result = ''

    switch (difficulty) {
      case 1:
        result = 'easy';
        break;
      case 2:
        result = 'medium'
        break;
      case 3:
        result = 'challenging'
        break;
      case 4:
        result = 'hard'
        break;
      case 5:
        result = 'very hard'
        break;


    }
    return result
  }

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

  let dataString = difficultyToString(difficulty)
  console.log('TCL: dataString', dataString)




  const newDiary = new Diary({
    _owner: user,
    category,
    description,
    timeSpent,
    difficulty,
    sourceType,
    sourceTitle,
    sourceLink,
    diaryTitle,
    difficultyString: dataString,
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
