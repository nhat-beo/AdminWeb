const ListAllRoom = require('../model/room')
const Listbill = require('../model/thong_bao_dat_phong')

// todo api
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
                    code: 200,
                    message: 'Phòng này đã hết, mời đặt phòng khác',
                    isSuccess: false
                })
                return;
            }
            r.statusRoom = 'Hết phòng'
            r.save().then(StatusRoomUpdate => {
                Listbill({
                    sophong: req.body.sophong,
                    hoten: req.body.hoten,
                    sdt: req.body.sdt,
                    cccd: req.body.cccd,
                    email: req.body.email,
                    ngaynhan: req.body.ngaynhan,
                    ngayTra: req.body.ngayTra,
                    sodem: req.body.sodem,
                    soNguoi: req.body.soNguoi,
                    datChoMinh: req.body.datChoMinh,
                    datChoNguoiKhac: req.body.datChoNguoiKhac,
                    gioNhanPhong: req.body.gioNhanPhong,
                    gioTra: req.body.gioTra,
                    giaPhong: req.body.giaPhong,
                }).save().then(res.json({
                        message: 'post thành công',
                        isSuccess: true,
                        code: 200,
                    })
                )

            }).catch(e => res.json({
                code: 404,
                message: e.message,
                isSuccess: false
            }));
            console.log('user:' + r + '>>>>' + req.body.Roomid)
        }).catch(e => {
            res.json({
                code: 404,
                message: 'e',
                isSuccess: false
            })
        })
    }

}


module.exports = new DatPhongController()