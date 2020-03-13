import * as functions from 'firebase-functions';
import admin = require('firebase-admin');

export const profile = functions.https.onRequest((req, res) => {
    const {uid} = req.query

    return admin.database().ref(`users/${uid}`).once('value').then(snapshot => {
        const profile = snapshot.val()

        if (profile) {
            return res.send(profile)
        } else {
            res.status(400)
            return res.send({
                message: 'Profile does not exist'
            })
        }
        
    })
})