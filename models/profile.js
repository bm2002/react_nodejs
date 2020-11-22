const {Schema, model, Types} = require('mongoose');

const profileScheme = Schema({
    _id: Types.ObjectId,
    name: {
        type: String,
        require: true,
        default: null
    },
    avatar: {
        type: String,
        require: true,
        default: null
    },
    team: {
        type: String,
        require: true,
        default: null
    },
    awards: {
        type: Number,
        require: true,
        default: 0
    }
}, { versionKey: false });

module.exports = model('Profile', profileScheme);

