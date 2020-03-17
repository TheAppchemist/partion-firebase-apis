import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const payments = functions.https.onRequest((req, res) => {
    const { userId } = req.query
    return admin.database().ref(`users/${userId}`).once('value').then(snapshot => {
        const data = snapshot.val()

        if (data == null) {
            res.status(400)
            return res.send({
                success: false,
                message: `User does not exist`
            })
        }

        return admin.database().ref(`payments`).orderByChild('uid').equalTo(userId).once('value').then(snapshot => {
            const payments = snapshot.val()

            return res.send({
                success: true,
                products: Object.keys(payments ? payments : {}).map(key => {
                    return {
                        ...payments[key],
                        id: key
                    }
                })
            })
        })
    })
})