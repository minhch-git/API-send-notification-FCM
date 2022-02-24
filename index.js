const express = require('express')
var admin = require('firebase-admin')

var serviceAccount = require('./privateKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const app = express()

// body parser
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.post('/firebase/notification', (req, res) => {
  const token = req.body.token

  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
  }

  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  }

  try {
    await admin.messaging().sendToDevice(token, message, options)
    res.status(200).json('successful message sent!')
  } catch (error) {
    console.log({ error })
  }
})

app.listen(8888, () => console.log('Server runing at port 8888'))
