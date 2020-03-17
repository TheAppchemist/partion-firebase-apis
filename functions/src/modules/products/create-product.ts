import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const createProduct = functions.https.onRequest((req, res) => {
    return admin.database().ref(`products`).push(req.body).then(() => {
        return res.send({
            success: true
        })
    })
})