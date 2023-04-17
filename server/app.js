const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')

require('dotenv').config()
const app = express()
const port = 3001
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

app.get('/user/:uid', async (req, res) => {
    const uid = req.params.uid
    try {
        const userInfo = await User.findOne({ uid: uid })
        if (userInfo !== null) {
            res.json(userInfo)
        } else {
            res.send('no user found')
        }
    } catch {
        res.send('failed to find user')
    }
})

app.post('/user', async (req, res) => {
    const uid = req.body.uid
    const username = req.body.username
    const user = new User({
        uid: uid,
        username: username,
        racesCompleted: 0,
        averageWPM: 0,
        fastestWPM: 0,
        averageAcc: 0
    })
    try {
        const newUser = await user.save()
        console.log('new user created')
        res.json(newUser)
    } catch {
        res.send('failed to make new user')
    }
})

app.put('/user', async (req, res) => {
    const uid = req.body.uid
    const WPM = req.body.WPM
    const accuracy = req.body.acc
    try {
        let user = await User.findOne({ uid: uid }) 
        const newCount = user.racesCompleted + 1
        const newAverage = Math.round((user.averageWPM * user.racesCompleted + WPM) / newCount)
        const newFastest = WPM > user.fastestWPM ? WPM : user.fastestWPM
        const newAverageAcc = Math.round((user.averageAcc * user.racesCompleted + accuracy) / newCount)

        user.racesCompleted = newCount
        user.averageWPM = Math.round((newAverage + Number.EPSILON) * 100) / 100
        user.fastestWPM = newFastest
        user.averageAcc = Math.round((newAverageAcc + Number.EPSILON) * 100) / 100
        user = await user.save()

        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('connected to mongoose'))

app.listen(port, () => {
    console.log(`App is listening on port ${ port }`)
})