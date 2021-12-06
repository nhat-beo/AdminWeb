const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Rooms = new Schema({
    roomNumber: String,
    typeRoom: String,
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
    countCancel: Number,
    countAccept: Number,

})
module.exports = mongoose.model('rooms', Rooms)