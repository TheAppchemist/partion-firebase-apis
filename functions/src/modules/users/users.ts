import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const users = functions.https.onRequest((req, res) => {
    const { filter } = req.query
    let ref: any = admin.database().ref(`users`)

    if (filter) {
        ref = ref.orderByChild('role').equalTo(filter)
    }
    
    return ref.once('value').then((snapshot: any) => {
        const data = snapshot.val()

        return res.send({
            success: true,
            users: Object.keys(data ? data : {}).map(key => {
                return {
                    ...data[key],
                    id: key
                }
            })
        })
    })
})