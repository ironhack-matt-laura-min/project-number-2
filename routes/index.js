const express = require('express');
const Diary = require('../models/Diary');
const User = require('../models/User')
const router = express.Router();
const { checkConnected } = require('../configs/middlewares');
const uploadCloud = require('../configs/cloudinary.js');

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
  // .sort({ timeSpent: 1 })

  if (req.query.sort) {
    let sortingOption = req.query.sort
    var sortString = `{"${sortingOption}":1}`
    var sortObj = JSON.parse(sortString)
    Diary.find({ _owner: req.user }).sort(sortObj).populate('_owner').lean()
      .then(diaries => {

        res.render('index2', { diaries });
      });
  }
  else {
    Diary.find({ _owner: req.user }).populate('_owner').lean()
      .then(diaries => {

        res.render('index2', { diaries });
      });
  }


});

// router.get('/sort/:field', (req, res, next) => {
//   Diary.find({ _owner: req.user }).sort({ timeSpent: 1 }).populate('_owner').lean()
//     .then(diaries => {
//       res.render('index2', { diaries });
//     });
// })

router.get('/profile', (req, res, next) => {
  const user = req.user
  res.render('Profile', { user });
});

router.post("/uploadAvatarImg/:Id", uploadCloud.single('photo'), (req, res, next) => {
  const id = req.params.Id
  User.findOneAndUpdate({ _id: id }, { imgPath: req.file.url })
    .then(() => res.redirect('/profile'))
    .catch(err => { console.log("error at Post / upload", err) })

})




module.exports = router;
