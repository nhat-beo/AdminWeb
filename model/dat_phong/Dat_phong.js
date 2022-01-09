const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DatPhong = new Schema({
    maPhong: String,
    hoten: String,
    loaiPhong: String,
    cmnd: String,
    email: String,
    soPhong:String,
    giaPhong: Number,
    ngayNhan: String,
    ngayTra: String,
    soDem: Number,
    soNguoi: Number,
    gioNhanPhong: String,
    gioTraPhong: String,
    tongTien: Number,
    sdt: String,
})
module.exports = mongoose.model('DatPhong', DatPhong)