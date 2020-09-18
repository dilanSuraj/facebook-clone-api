const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    surname: {
        type: String,
        trim: true,
        required: 'Surname field cannot be empty'
    },
    user_name: {
        type: String,
        trim: true,
        required: 'Username field cannot be empty'
    },
    hashed_password: {
        type: String,
        required: 'Password field cannot be empty'
    },
    first_name: {
        type: String,
        trim: true,
        required: 'First Name field cannot be empty'
    },
    gender: {
      type: String,
      default: 'OTHERS',
      enum: ['MALE','FEMALE','OTHERS']
    },
    birth_date: {
        type: Date,
        default: Date.now,
        required: 'Birth date field cannot be empty'
    }
});

module.exports = mongoose.model('Users', UserSchema);