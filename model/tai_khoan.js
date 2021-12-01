const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TaiKhoan = new Schema({
    _id: Number,
    gmail: String,
    password: String,
    name: String,
    birthday: String,
    phoneNumber: String,
    cccd:String,
})

module.exports = mongoose.model('accounts', TaiKhoan)
