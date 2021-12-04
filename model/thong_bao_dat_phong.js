const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ThongBaoDatPhong = new Schema({
    sophong: String,
    hoten: String,
    sdt: String,
    loaiPhong: String,
    hangPhong:String,
    cccd: Number,
    email: String,
    ngaynhan: String,
    ngayTra: String,
    sodem: Number,
    soNguoi: Number,
    gioNhanPhong: String,
    gioTra: String,
    giaPhong: Number,
})
module.exports = mongoose.model('ThongBaoDatPhong', ThongBaoDatPhong)