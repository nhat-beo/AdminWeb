const express = require('express')
const route = express.Router()
const apiController = require('./APi_all_list')
const AcountController = require('./AcountController')


// todo some api
route.get('/get-all-list-room-finish',apiController.getAlllistromed)

route.get('/get-all-list-account',apiController.getAllAccount)

route.get('/get-all-list-room',apiController.getAllRooms)

route.get('/get-one-user',AcountController.getAcount)

route.post('/insert-acount', AcountController.insertAcount)

route.post('/update-acount', AcountController.updateAcount)





module.exports = route
