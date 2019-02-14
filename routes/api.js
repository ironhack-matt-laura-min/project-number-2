const express = require('express');
const Diary = require('../models/Diary')
const router = express.Router();

router.get('/diaries', (req, res, next) => {
  var ObjectID = require('mongodb').ObjectID


  Diary.find(
    // _id: {
    //   $gt: ObjectID.createFromTime(Date.now() / 1000 - 24 * 60 * 60)
    // }
    { _owner: req.user }
  )
    .then(diaries => {
      res.json(diaries)
    })
    .catch(err => {
      console.log(err);
      res.json({
        err: 'Sorry, something bad happened'
      })
    })
})

module.exports = router;