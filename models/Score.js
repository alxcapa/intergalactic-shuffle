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
}, {
  timestamps: true
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;