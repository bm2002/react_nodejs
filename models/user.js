const {Schema, model, Types} = require('mongoose');

const userScheme = Schema({
    id : {
        type: Types.ObjectId
        // ref: 'Link' 
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
    }
}, { versionKey: false });

module.exports = model('User', userScheme);