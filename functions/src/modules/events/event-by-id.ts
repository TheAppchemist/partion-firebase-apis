import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const eventById = functions.https.onRequest((req, res) => {
    const { id } = req.query
    return admin.database().ref(`events/${id}`).once('value').then(snapshot => {
        const data = snapshot.val()

        if (data) {
            return res.send({
                success: true,
                event: data
            })
        } else {
            res.status(400)
            return res.send({
                message: 'Event not found'
            })
        }
    })
})