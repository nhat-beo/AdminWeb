
// const expess = require('express')
// const fetch = require('node-fetch')
//
// const router = expess.Router()
//
// router.post("/sendToAll", (req, res) => {
//     var notification = {
//         'title': 'Tiltle of noti',
//         'text': 'Subtitle'
//     };
//
//     var fcm_tokens = ['fLOsTLcTTha2PhwP_7vD-G:APA91bHUmMPurTdMk_LQpKvvIS4XUwbrJfRB0jriJxqAVbhVGIWm_k1NEXJJIOukazgCu1std0X30mTMBwz9aqqzDMV5_HZylCACmf0rYojhPZZeLJypoCzTDrrQaB6NygNEtM_imj-2\n'];
//
//     var notification_body = {
//         'notification': notification,
//         'registration_ids': fcm_tokens
//     }
//
//     fetch('http://fcm.googleapis.com/fcm/send', {
//         'method': POST,
//         'headers': {
//             'Authorization': 'key=' + 'AAAA5zhfLos:APA91bHUP5R25rIF7OtGEOlJ' +
//                 'B26BgNCyBUv1JKBShz6wmr9yLnJZqIlF4GBi4qdPgfIsk' +
//                 'ibob7z1UHz42kOilxhvp2YHYOv_8nszalz2lukvjGgu8x' +
//                 'Rd_El8WE-ynhg0mgix-uruduig',
//             'Content-Type': 'application/json'
//
//         },
//         'body': JSON.stringify(notification_body)
//     }).then(() => {
//         res.status(200).send('đã thành công rồi mày ơi')
//     }).catch((err) => {
//         res.status(400).send('Có lỗi rồi mày ạ')
//         console.log(err)
//     })
//
//
// })
//
// module.exports = router

// let admin = require("firebase-admin");
//
// let serviceAccount = require("fbookinghotel-firebase-adminsdk-qz1dj-015c3c3b28.json");
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: xx
// });
//
// var registrationToken = "fLOsTLcTTha2PhwP_7vD-G:APA91bHUmMPurTdMk_LQpKvvIS4XUwbrJfRB0jriJxqAVbhVGIWm_k1NEXJJIOukazgCu1std0X30mTMBwz9aqqzDMV5_HZylCACmf0rYojhPZZeLJypoCzTDrrQaB6NygNEtM_imj-2\n";
//
// var payload = {
//     notification: {
//         title: "Account Deposit",
//         body: "A deposit to your savings account has just cleared."
//     },
//     data: {
//         account: "Savings",
//         balance: "$3020.25"
//     }
// };
//
// var options = {
//     priority: "normal",
//     timeToLive: 60 * 60
// };
//
// admin.messaging().sendToDevice(registrationToken, payload, options)
//     .then(function(response) {
//         console.log("Successfully sent message:", response);
//     })
//     .catch(function(error) {
//         console.log("Error sending message:", error);
//     });

var express = require('express');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAA5zhfLos:APA91bHUP5R25rIF7OtGEOlJB26BgNCyBUv1JKBShz6wmr9yLnJZqIlF4GBi4qdPgfIskibob7z1UHz42kOilxhvp2YHYOv_8nszalz2lukvjGgu8xRd_El8WE-ynhg0mgix-uruduig'; //put your server key here
var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'fLOsTLcTTha2PhwP_7vD-G:APA91bHUmMPurTdMk_LQpKvvIS4XUwbrJfRB0jriJxqAVbhVGIWm_k1NEXJJIOukazgCu1std0X30mTMBwz9aqqzDMV5_HZylCACmf0rYojhPZZeLJypoCzTDrrQaB6NygNEtM_imj-2',
    collapse_key: 'your_collapse_key',

    notification: {
        title: 'Tin nhắn từ Nguyễn Thành Nhật',
        body: 'Xin chào Đặng Xuân Tùng đẹp trai nhá!!!'
    },

    data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

