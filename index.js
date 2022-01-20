const express = require('express')
const firebaseAdmin = require('firebase-admin')
var serviceAccount = require('./privateKey.json')

const firebaseToken =
	'cSI8GJ2ISn6tId34wuCCQq:APA91bHBbhhjajlQMTjmzooHk0y0D7DYNWG0Q7_CkxKJw5DsNS8eqEIw39LUH36Md849nqZeYdUpWNoow3exgFZYe06tXxTv3aKvG4tXDvdRcDkriCxgW6V_RleHvHa7Z03XC6rTIqEY'

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
})

const app = express()

app.get('/', (req, res) => {
	const payload = {
		notification: {
			title: 'Notification title',
			body: 'Hello firebase admin',
			click_action: 'FLUTTER_NOTIFICATION_CLICK',
		},
		data: {
			data: ' 1. Lorem ipsum dolor sit.',
		},
	}
	firebaseAdmin.messaging().sendToDevice(firebaseToken, payload)
	res.send('Send message successful!')
})

app.listen(8888, () => console.log('Server runing at port 8888'))
