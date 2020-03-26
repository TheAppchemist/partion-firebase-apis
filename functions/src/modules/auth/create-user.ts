import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

export const createUser = functions.https.onRequest((req, res) => {
    const user = req.body

    return admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.fname + ' ' + user.lastname
    }).then(authUser => {
        delete user.password

        return admin.database().ref(`users/${authUser.uid}`).set(user).then(() => {
            return res.send({
                success: true,
                user: {
                    ...user,
                    id: authUser.uid
                }
            })
        })
    }).catch(err => {
        res.status(400)
        return res.send({
            message: err
        })
    })
})