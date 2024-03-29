const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = model('User', UserSchema);

module.exports = User;
