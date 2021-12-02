const express = require('express')
const route = express.Router()
const apiController = require('./APi_all_list')

// todo some api
route.get('/get-all-list-room-finish',apiController.getAlllistromed)

route.get('/get-all-list-account',apiController.getAllAccount)

route.get('/get-all-list-room',apiController.getAllRooms)

route.post('/book-room', )

module.exports = route
