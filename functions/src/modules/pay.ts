import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

const html = `
<html>
    <body>
        <script>
            window.onload = function(){
                document.forms['payfast'].submit();
            }
        </script>
        <form name='payfast' action='[PAYFAST_URL]' method='POST'>
            [FORM]
        </form>
    </body>
</html>`

const parseCart = (data: any) => {
    if (data) {
        const barStops = Object.keys(data.bar ? data.bar : {})
            .map(key => {
                const bar = {
                    id: key,
                    ...data.bar[key],
                    type: 'bar'
                }

                return bar
            })
        const eventStops = Object.keys(data.event ? data.event : {})
            .map(key => {
                const bar = {
                    id: key,
                    ...data.event[key],
                    type: 'event'
                }

                return bar
            })
        
        return barStops.concat(eventStops)
    } else {
        return []
    }
}

export const pay = functions.https.onRequest((req, res) => {
    const { uid } = req.query
    const mode = 'demo'
    const payfast = {
        live: {
            merchant_id: '11612308',
            merchant_key: '1q8b0zoyh0b38',
            url: 'https://www.payfast.co.za/eng/process'
        }, 
        demo: {
            merchant_id: '10004056',
            merchant_key: '2kiaths97drb2',
            url: 'https://sandbox.payfast.co.za/eng/process'
        }
    }

    return admin.database().ref(`cart/${uid}`).once('value').then(snapshot => {
        const cart = parseCart(snapshot.val())
        let amount = 15

        cart.forEach(venue => {
            const products = Object.keys(venue.products ? venue.products : {}).map(key => {
                return {
                    id: key,
                    ...venue.products[key]
                }
            })
            const specials = Object.keys(venue.specials ? venue.specials : {}).map(key => {
                return {
                    id: key,
                    ...venue.specials[key]
                }
            })

            products.forEach(product => {
                amount += product.price * product.qty
            })
            specials.forEach(special => {
                amount += special.price * special.qty
            })
        })

        return admin.database().ref(`users/${uid}`).once('value').then(snapshot => {
            const user = snapshot.val()

            return admin.database().ref(`payments`).push({
                createdAt: new Date().getTime(),
                uid: uid,
                amount: amount,
                cart: cart,
                paid: false,
                uid_paid: uid + '_' + 'false'
            }).then(ref => {
                if (user) {
                    const initialValues: any = {
                        merchant_id: payfast[mode].merchant_id,
                        merchant_key: payfast[mode].merchant_key,
                        return_url: 'https://us-central1-ok-go-live.cloudfunctions.net/paid',
                        cancel_url: 'https://us-central1-ok-go-live.cloudfunctions.net/notPaid',
                        notify_url: 'https://us-central1-unique-sentinel-230908.cloudfunctions.net/payment',
                        name_first: user.name,
                        name_last: user.surname,
                        email_address: user.email,
                        m_payment_id: ref.key,
                        amount: amount,
                        item_name: 'Partion',
                        item_description: 'Partion Checkout',
                        email_confirmation: 1,
                        passphrase: 'blahblahblah',
                        payment_method: 'cc'
                    }

                    const form = Object.keys(initialValues).map(key => {
                        return `<input type='hidden' name='${key}' value='${initialValues[key]}' />`
                    }).join('')

                    return res.send(html.replace('[FORM]', form).replace('[PAYFAST_URL]', payfast[mode].url))
                } else {
                    res.status(400)
                    return res.send('User not found')
                }
            })
            
        })
    })
});