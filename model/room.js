const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Rooms = new Schema({
    _id: Number,
    roomNumber: String,
    typeRoom: String,
    rankRoom: String,
    peopleRoom: String,
    priceRoom:String,
    statusRoom: Number,
    description: Boolean,
    wifi: Boolean,
    receptionist: String,
    gym: String,
    roomMeeting: Number,
    laundry: Number,
    pool: String,
    restaurant: String,
    elevator: Number,
    wheelChairWay: Number,
    shuttle: Number,
    other: Number,
})
module.exports = mongoose.model('rooms', Rooms)