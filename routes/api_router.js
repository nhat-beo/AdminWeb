const express = require('express')
const route = express.Router()
const apiController = require('../routes/APi')


route.get('/get-all-list-room-finish',apiController.getAlllistromed)

route.get('/get-all-list-account',apiController.getAllAccount)

route.get('/get-all-list-room',apiController.getAllRooms)

module.exports = route
