import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const products = functions.https.onRequest((req, res) => {
    const { barId, venueType } = req.query
    return admin.database().ref(`products/${venueType}/${barId}`).once('value').then(snapshot => {
        const data = snapshot.val()

        if (data == null) {
            res.status(400)
            return res.send({
                success: false,
                message: `${venueType} does not exist`
            })
        }

        return res.send({
            success: true,
            products: Object.keys(data ? data : {}).map(key => {
                return {
                    ...data[key],
                    id: key
                }
            })
        })
    })
})