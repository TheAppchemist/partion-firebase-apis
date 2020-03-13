// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Pay from './modules/pay'
import * as Payment from './modules/payment'
import * as Login from './modules/auth/login'
import * as Profile from './modules/profile/profile'
import * as Bars from './modules/bars/bars'
import * as BarById from './modules/bars/bar-by-id'
import * as Events from './modules/events/events'
import * as EventById from './modules/events/event-by-id'
import * as Users from './modules/users/users'
import * as Promotions from './modules/promotions/promotions'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



admin.initializeApp()

export const pay = Pay.pay
export const payment = Payment.payment
export const login = Login.login
export const profile = Profile.profile

export const bars = Bars.bars
export const barById = BarById.barById

export const events = Events.events
export const eventById = EventById.eventById

export const users = Users.users
export const promotions = Promotions.pomotions