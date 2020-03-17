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

        return admin.database().ref(`users/${authUser.uid}`).set(user)
    })
})