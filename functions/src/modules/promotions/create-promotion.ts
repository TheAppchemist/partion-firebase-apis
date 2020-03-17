import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const createPromotions = functions.https.onRequest((req, res) => {
    return admin.database().ref(`promotions`).push(req.body).then(() => {
        return res.send({
            success: true
        })
    })
})