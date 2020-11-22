const {Schema, model, Types} = require('mongoose');

const userScheme = Schema({
    _id: Types.ObjectId,
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    passwordHash: {
        type: String,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false 
    },
    profile :{
        type: Types.ObjectId,
        ref: 'Profile'
    }
}, { versionKey: false });

module.exports = model('User', userScheme);