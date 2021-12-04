const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TaiKhoan = new Schema({
    gmail: String,
    password: String,
    name: String,
    birthday: String,
    phoneNumber: String,
    cccd:String,
    mota:String
})

module.exports = mongoose.model('accounts', TaiKhoan)
