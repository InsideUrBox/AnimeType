const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    racesCompleted: {
        type: Number,
        required: true
    },
    averageWPM: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)