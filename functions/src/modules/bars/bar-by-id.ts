import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const barById = functions.https.onRequest((req, res) => {
    const { id } = req.query
    return admin.database().ref(`bars/${id}`).once('value').then(snapshot => {
        const data = snapshot.val()

        if (data) {
            return res.send({
                success: true,
                bar: data
            })
        } else {
            res.status(400)
            return res.send({
                message: 'Bar not found'
            })
        }
    })
})