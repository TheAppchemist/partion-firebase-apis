import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import * as admin from "firebase-admin";

export const payment = functions.https.onRequest((req, res) => {
    console.log(req.body)

    const body = req.body
    const ref = admin.database().ref(`payments/${body.m_payment_id}`)

    return ref.once('value').then(snapshot => {
        const data = snapshot.val()
        console.log(data)
        console.log(data.uid)

        return admin.database().ref(`cart/${data.uid}`).remove().then(() => {
            return ref.update({
                paid: true,
                paymentId: body.pf_payment_id,
                uid_paid: data.uid + '_' + 'paid'
            }).then(() => {
                return admin.database().ref(`vouchers/${data.uid}`).push({
                    createdAt: new Date().getTime(),
                    active: true,
                    stops: data.cart.map((item: any) => {
                        return {
                            ...item,
                            redeemed: false
                        }
                    })
                })
            })
        })
    }).catch(() => {
        res.status(400)
        res.send({success: false})
    })
})