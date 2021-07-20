const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Score = require("../models/Score");

function loopThruScores(array) {
  const resultScore = [];
  for (let i = 0; i < array.length; i++) {
    if (!array[i].score_ref.length < 1 ) {
      console.log('oi')
      resultScore.push(array[i].score_ref[0]);
    }
  }
  console.log("its the loop", resultScore);
}

function loopThruDates(array) {
  const resultDates = [];
  for (let i = 0; i < array.length; i++) {
    resultDates.push(array[i].createdAt);
  }
  return resultDates;
}

function loopThruLocations(array) {
  const resultLocations = [];
  for (let i = 0; i < array.length; i++) {
    resultLocations.push(array[i].location);
  }
  return resultLocations;
}

router.get("/profile", (req, res) => {
  if (!req.user) {
    res.json({
      errorMessage: "Vous devez vous identifier pour acceder à ce contenu",
    });
    return;
  }
  User.findOne({
    _id: req.user.id,
  })
    .populate("score_ref")
    .then((user) => {
      res.json({
        user: user,
      });
    })
    .catch((err) => next(err));
});

router.post("/game", (req, res) => {
  if (!req.user) {
    res.json({
      errorMessage: "Vous devez vous identifier pour acceder à ce contenu",
    });
    return;
  }
  const high_score = req.body.high_score;
  const object_one = req.body.object_one;
  const object_two = req.body.object_two;
  const object_three = req.body.object_three;

  const newScore = new Score({
    high_score,
    object_one,
    object_two,
    object_three,
  });
  newScore
    .save()
    .then((scoreFromDB) => {
      User.findOne({
        _id: req.user.id,
      }).then((user) => {
        user.score_ref.push(scoreFromDB.id);
        console.log(user.score_ref);
        console.log(scoreFromDB.id);
        user
          .save()
          .then(() => {
            console.log(user);
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
});

router.get("/stats", (req, res, next) => {
  User.find({})
    .then((usersFromDb) => {
      console.log(usersFromDb);
      const number_entries = usersFromDb.length;
      console.log(number_entries);
      const date_sign_up = loopThruDates(usersFromDb);
      console.log("date====>", date_sign_up);
      const locations = loopThruLocations(usersFromDb);
      console.log("locations====>", locations);
    })
    .catch((err) => next(err));
});

router.get("/ranking-game", (req, res, next) => {
  User.find({})
    .populate("score_ref")
    .then((usersFromDb) => {
      // console.log("ici", usersFromDb)
      // console.log("scores====>", usersFromDb[1].score_ref[0].high_score);
      loopThruScores(usersFromDb);
    })
    .catch((err) => next(err));
});

module.exports = router;
