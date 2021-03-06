import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const createProduct = functions.https.onRequest((req, res) => {
    const { type, venueId } = req.query
    return admin.database().ref(`products/${type}s/${venueId}`).push(req.body).then(() => {
        return res.send({
            success: true
        })
    })
})