const express = require('express')
const route = express.Router()
const apiController = require('./APi_all_list')
const AcountController = require('./AcountController')
const UpdateRoomController = require('./UpdateRoomController')
const HistoryByUser = require('./HistoryUserControler')




// todo some api
route.get('/get-all-list-room-finish',apiController.getAlllistromed)

route.get('/get-all-list-account',apiController.getAllAccount)

route.get('/get-all-list-room',apiController.getAllRooms)

route.get('/get-one-acount',AcountController.getAcount)

route.post('/insert-acount', AcountController.insertAcount)

route.post('/update-acount', AcountController.updateAcount)

route.post('/moi-cmm-dat-phong', UpdateRoomController.insertRoom)

route.get('/get-history-by-user', HistoryByUser.getHistoryUser)

module.exports = route
