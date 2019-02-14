const express = require('express');
const Diary = require('../models/Diary');
const User = require('../models/User');
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
  // .sort({ timeSpent: 1 })

  if (req.query.sort) {
    let sortingOption = req.query.sort;
    var sortString = `{"${sortingOption}":1}`;
    var sortObj = JSON.parse(sortString);
    Diary.find({ _owner: req.user })
      .sort(sortObj)
      .populate('_owner')
      .lean()
      .then(diaries => {
        res.render('new-story', { diaries });
      });
  } else {
    Diary.find({ _owner: req.user })
      .populate('_owner')
      .lean()
      .then(diaries => {
        res.render('new-story', { diaries });
      });
  }
});

router.get('/profile', checkConnected, (req, res, next) => {
  const user = req.user;
  res.render('Profile', { user });
});

router.get('/profile/:Id', (req, res, next) => {
  User.findById(req.params.Id).then(user => {
    res.render('user-profile', { user });
  });
});

router.get('/edit-profile', checkConnected, (req, res, next) => {
  console.log(req.params.id);
  User.findById(req.user._id).then(user => {
    res.render('edit-profile', { user });
  });
});

router.post('/edit-profile', checkConnected, (req, res, next) => {
  let email = req.body.email;
  let aboutMe = req.body.aboutMe;
  User.findByIdAndUpdate(req.user._id, { email: email, aboutMe: aboutMe }).then(
    () => {
      res.redirect('/profile');
    }
  );
});

router.post(
  '/uploadAvatarImg',
  uploadCloud.single('photo'),
  (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { imgPath: req.file.url })
      .then(() => res.redirect('/profile'))
      .catch(err => {
        console.log('error at Post / upload', err);
      });
  }
);

router.get('/read-stories', checkConnected, (req, res, next) => {
  Diary.find()
    .populate('_owner')
    .then(diaries => {
      res.render('read-stories', { diaries });
    });
});

router.get('/read-story/:Id', (req, res, next) => {
  Diary.findById(req.params.Id)
    .populate('_owner')
    .then(diary => {
      res.render('read-story', { diary });
    });
});

router.get('/delete-story/:id', checkConnected, (req, res, next) => {
  console.log(req.params.id);
  Diary.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/new-story');
  });
});

router.get('/edit-story/:id', checkConnected, (req, res, next) => {
  console.log(req.params.id);
  Diary.findById(req.params.id).then(diary => {
    res.render('edit-story', { diary });
  });
});

router.post('/edit-story', checkConnected, (req, res, next) => {
  Diary.findByIdAndUpdate(req.user._id, { description: description }).then(
    () => {
      res.redirect('/new-story');
    }
  );
});

module.exports = router;
