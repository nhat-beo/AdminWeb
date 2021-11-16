const mongoose = require('mongoose')
const Schema = mongoose.Schema


const DatPhong = new Schema({
    maPhong: Number,
    hoten: String,
    loaiPhong: String,
    cmnd: String,
    email: String,
    soPhong:Number,
    giaPhong: Number,
    datChoMinh: Boolean,
    datChoNguoiKhac: Boolean,
    ngayNhan: String,
    ngayTra: String,
    soDem: Number,
    soNguoi: Number,
    gioNhanPhong: String,
    gioTraPhong: String,
    sdt: Number,
})
module.exports = mongoose.model('DatPhong', DatPhong)