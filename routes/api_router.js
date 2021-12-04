const express = require('express')
const route = express.Router()
const apiController = require('./APi_all_list')
const AcountController = require('./AcountController')
const UpdateRoomController = require('./DatPhongController')
const HistoryByUser = require('./HistoryUserControler')
const TopFavorrite = require('./GetTopRoom')




// todo some api
route.get('/get-all-list-room-finish',apiController.getAlllistromed)

route.get('/get-all-list-account',apiController.getAllAccount)

route.get('/get-all-list-room',apiController.getAllRooms)

route.get('/get-one-acount',AcountController.getAcount)

route.post('/insert-acount', AcountController.insertAcount)

route.post('/update-acount', AcountController.updateAcount)

route.post('/wait-to-accept-room', UpdateRoomController.insertRoom)

route.get('/get-history-by-user', HistoryByUser.getHistoryUser)

route.get('/get-top-10-favorite', TopFavorrite.getTopRoom)

module.exports = route
