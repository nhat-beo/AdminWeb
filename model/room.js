const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Rooms = new Schema({
    _id: Number,
    roomNumber: String,
    typeRoom: Number,
    rankRoom: String,
    peopleRoom: Number,
    priceRoom: Number,
    statusRoom: String,
    description: String,
    wifi: Boolean,
    receptionist: Boolean,
    gym: Boolean,
    roomMeeting: Boolean,
    laundry: Boolean,
    pool: Boolean,
    restaurant: Boolean,
    elevator: Boolean,
    wheelChairWay: Boolean,
    shuttle: Boolean,
    other: String,
})
module.exports = mongoose.model('rooms', Rooms)
