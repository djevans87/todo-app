const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  todos: [
    { type: String 
    }],
});
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;