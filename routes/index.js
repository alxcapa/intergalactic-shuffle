const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Score = require("../models/Score");

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
  Score.findOne({
    user_ref: req.user.id,
  })
    .populate("user_ref")
    .then((user) => {
      // res.json({
      //   user: user,
      // });
      console.log("this user===>", user);
    })
    .catch((err) => next(err));
});

router.put("/profile", (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
  })
    .then((user) => {
      console.log(user);
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
  const user_ref = req.user.id;

  const newScore = new Score({
    high_score,
    object_one,
    object_two,
    object_three,
    user_ref,
  });
  newScore
    .save()
    .then((scoreFromDB) => {
      console.log(scoreFromDB);
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
  Score.find({})
    .sort({ high_score: -1 })
    .populate("user_ref")
    .then((scoresFromDb) => {
      console.log("score====>", scoresFromDb);
    })
    .catch((err) => next(err));
});

module.exports = router;
