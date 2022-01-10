const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ThongBaoDatPhong = new Schema({
    Roomid: String,
    sophong: String,
    hoten: String,
    sdt: String,
    loaiPhong: String,
    hangPhong: String,
    cccd: String,
    email: String,
    ngaynhan: String,
    ngayTra: String,
    sodem: Number,
    soNguoi: Number,
    gioNhanPhong: String,
    gioTra: String,
    giaPhong: Number,
    tongTien: Number,
    tokenUser: String
})
module.exports = mongoose.model('ThongBaoDatPhong', ThongBaoDatPhong)
