const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
  high_score: {
    type: Number
  },
  object_one: {
    type: Number
  },
  object_two: {
    type: Number
  },
  object_three: {
    type: Number
  },
  trophies_bronze: {
    type: Number
  },
  trophies_argent: {
    type: Number
  },
  trophies_or: {
    type: Number
  },
}, {
  timestamps: true
});

const Score = mongoose.model('Score', userSchema);

module.exports = Score;