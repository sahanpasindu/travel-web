const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Please tell us your name'],
         trim: true
      },
      email: {
         type: String,
         required: [true, 'Please provide your email'],
         unique: true,
         lowercase: true,
         trim: true,
         validate: [validator.isEmail, 'Please provide a valid email']
      },
      photo: {
         type: String,
      },
      password: {
         type: String,
         required: [true, 'Please provide your passwrod'],
         minlength: 8
      },
      passwordConfirm: {
         type: String,
         required: [true, 'Please confirm your password']
      }

   }
);

const User = mongoose.model('User', userSchema);
module.exports = User;