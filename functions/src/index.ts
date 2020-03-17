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
import * as CreateUser from './modules/auth/create-user'
import * as UpdateProfile from './modules/profile/update-profile'
import * as UpdateBar from './modules/bars/update-bar'
import * as UpdateEvent from './modules/events/update-event'
import * as UpdatePromotions from './modules/promotions/update-promotions'
import * as CreatePromotions from './modules/promotions/create-promotion'
import * as CreateSpecials from './modules/specials/create-special'
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
export const updateProfile = UpdateProfile.updateProfile

export const bars = Bars.bars
export const barById = BarById.barById

export const events = Events.events
export const eventById = EventById.eventById
export const updateEvent = UpdateEvent.updateEvent
export const updateBar = UpdateBar.updateBar

export const users = Users.users
export const createUser = CreateUser.createUser
export const promotions = Promotions.pomotions
export const updatePromotions = UpdatePromotions
export const createPromotions = CreatePromotions.createPromotions

export const createSpecial = CreateSpecials.createSpecial