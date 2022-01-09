const mongoose = require('mongoose')
const Schema = mongoose.Schema


const LichSuDatPhong = new Schema({
    maPhong: String,
    hoten: String,
    loaiPhong: String,
    cmnd: String,
    email: String,
    soPhong: String,
    giaPhong: Number,
    ngayNhan: String,
    ngayTra: String,
    soDem: Number,
    soNguoi: Number,
    gioNhanPhong: String,
    gioTraPhong: String,
    sdt: String,
    tongTien: Number,
    acceptDate: {type: String, default: ''}
})
module.exports = mongoose.model('LichSuDatPhongs', LichSuDatPhong)