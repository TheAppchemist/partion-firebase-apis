import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const events = functions.https.onRequest((req, res) => {
    return admin.database().ref(`events`).once('value').then(snapshot => {
        const data = snapshot.val()

        return res.send({
            success: true,
            events: Object.keys(data ? data : {}).map(key => {
                return {
                    ...data[key],
                    id: key
                }
            })
        })
    })
})