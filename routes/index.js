const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get("/home", (req, res, next) => {
  res.render('index2')
})

router.get("/home/profile", (req, res, next) => {
  res.render('Profile')
})

module.exports = router;
