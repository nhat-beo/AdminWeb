const express = require('express')
const route = express.Router()
const apiController = require('../routes/APi')


route.get('/get-all-list-room',apiController.getAlllistromed)

module.exports = route
