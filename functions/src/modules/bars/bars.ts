import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const bars = functions.https.onRequest((req, res) => {
    return admin.database().ref(`bars`).once('value').then(snapshot => {
        const data = snapshot.val()

        return res.send({
            success: true,
            bars: Object.keys(data ? data : {}).map(key => {
                return {
                    ...data[key],
                    id: key
                }
            })
        })
    })
})