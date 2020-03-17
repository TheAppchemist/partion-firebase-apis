import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const createSpecial = functions.https.onRequest((req, res) => {
    return admin.database().ref(`specials`).push(req.body).then(() => {
        return res.send({
            success: true
        })
    })
})