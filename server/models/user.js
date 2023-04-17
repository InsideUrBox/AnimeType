const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    racesCompleted: {
        type: Number,
        required: true
    },
    averageWPM: {
        type: Number,
        required: true
    },
    fastestWPM: {
        type: Number,
        required: true
    },
    averageAcc: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)