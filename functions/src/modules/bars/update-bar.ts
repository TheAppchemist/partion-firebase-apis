import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const updateBar = functions.https.onRequest((req, res) => {
    const { id } = req.body
    const ref = admin.database().ref(`bars/${id}`)

    return ref.once('value').then(snapshot => {
        const data = snapshot.val()

        if (data) {
            return ref.update(req.body).then(() => {
                return res.send({
                    success: true,
                    bar: req.body
                })
            })
        } else {
            res.status(400)
            return res.send({
                message: 'Bar not found'
            })
        }
    })
})