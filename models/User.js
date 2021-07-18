const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Le prénom est obligatoire.']
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    lowercase: true
  },
  location: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire.'],
    minlength: 5,
    // maxlength: 16,
  },
  score_ref: [{ type: Schema.Types.ObjectId, ref: 'Score' }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;