const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')

require('dotenv').config()
const app = express()
const port = 3001

app.get('/user/:uid', async (req, res) => {
    const uid = req.params.uid
    try {
        const userInfo = await User.findOne({ uid: uid })
        res.json(userInfo)
    } catch {
        res.send('failed to find user')
    }
})

app.post('/user/:uid', async (req, res) => {
    const uid = req.params.uid
    const user = new User({
        uid: uid,
        racesCompleted: 0,
        averageWPM: 0
    })
    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch {
        res.send('failed to make new user')
    }
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('connected to mongoose'))

app.listen(port, () => {
    console.log(`App is listening on port ${ port }`)
})