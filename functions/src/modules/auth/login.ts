import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin'
import * as axios from 'axios'

export const login = functions.https.onRequest((req, res) => {
    const {email, password} = req.query

    return axios.default.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDGnq2aoghNHH-_Y0bF2rLm_oQj35dX9D4', 
        JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            return res.send({
                success: true,
                user: result.data
            })
        }).catch((err) => {
            res.status(400)
            return res.send({
                success: false,
                error: err.response.data.error
            })
        })
})