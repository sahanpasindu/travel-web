const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
         required: [true, 'Please confirm your password'],
         validate: {
            // This only works on CREATE and SAVE!!
            validator: function (el) {
               return el === this.password;
            },
            message: 'Password are not the same'
         }
      }

   }
);
userSchema.pre('save', async function (next) {
   // Only run this function if password actually modified
   if (!this.isModified('password')) return next();

   // Hash the password with cost of 12
   this.password = await bcrypt.hash(this.password, 12);

   // Delete passwordConfirm field
   this.passwordConfirm = undefined;
   next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;