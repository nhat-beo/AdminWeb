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

route.post('/delete-history-by-user', HistoryByUser.deleteHistory)

route.post('/delete-all-history-by-user', HistoryByUser.deleteAllHistory)

route.get('/get-top-favorite', TopFavorrite.getTopRoom)

route.get('/get-filter-Room', apiController.FilterRoom)

route.post('/update-favorite', apiController.updateFavorite)

route.post('/cancel-wait-to-accept', UpdateRoomController.canceWaitlRoom)

route.get('/get-list-wait-to-accept-room', UpdateRoomController.getWaitToAcceptUser)

route.get('/get-list-favorite-by-user', apiController.getListFavoriteByUser)

module.exports = route
