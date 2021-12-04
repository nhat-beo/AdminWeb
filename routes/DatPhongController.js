const ListAllRoom = require('../model/room')
const Listbill = require('../model/dat_phong/Dat_phong')


class DatPhongController {
    async insertRoom(req, res) {

        if (req.body.Roomid == null) {
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền ít nhất RoomsId',
                isSuccess: false
            })
            return
        }
        ListAllRoom.findOne({
            _id: req.body.Roomid
        }).then(r => {
            if (r == null) {
                res.json({
                    message: 'Không tìm thấy room'
                })
                return;
            }
            if (r.statusRoom == 'Hết phòng') {
                res.json({
                    message: 'Phòng này đã hết, mời đặt phòng khác'
                })
                return;
            }
            r.statusRoom = 'Hết Phòng'
            r.save().then(StatusRoomUpdate => {
                Listbill({
                    maPhong: StatusRoomUpdate._id,
                    hoten: req.body.hoten,
                    loaiPhong: req.body.loaiPhong,
                    cmnd: req.body.cmnd,
                    email: req.body.email,
                    soPhong: req.body.soPhong,
                    giaPhong: req.body.giaPhong,
                    datChoMinh: req.body.datChoMinh,
                    datChoNguoiKhac: req.body.datChoNguoiKhac,
                    ngayNhan: req.body.ngayNhan,
                    ngayTra: req.body.ngayTra,
                    soDem: req.body.soDem,
                    soNguoi: req.body.soNguoi,
                    gioNhanPhong: req.body.gioNhanPhong,
                    gioTraPhong: req.body.gioTraPhong,
                    sdt: req.body.sdt,
                })
                res.json({
                    message: 'Cập nhật trạng thái thành công',
                    isSuccess: true,
                    code: 200,
                })
            }).catch(e => res.json({
                code: 404,
                message: e.message,
                isSuccess: false
            }));
            console.log('user:' + r + '>>>>' + req.body.Roomid)


        }).catch(e => {
            res.json({
                code: 404,
                message: e.message,
                isSuccess: false
            })
        })
    }

}


module.exports = new DatPhongController()