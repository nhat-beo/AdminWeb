const ListAllRoom = require('../model/room')
const Listbill = require('../model/thong_bao_dat_phong')
const ListHistoryUser = require("../model/lich_su_dat_phong");
const ThongBaoDatPhong = require("../model/thong_bao_dat_phong");

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
                    message: 'Phòng này đã hết, mời đặt phòng khác',
                    isSuccess: true
                })
                return;
            }
            if (r.statusRoom == 'Chờ xác nhận') {
                res.json({
                    message: 'Phòng này đang chờ xác nhận, mời đặt phòng khác',
                    isSuccess: true
                })
                return;
            }
            r.statusRoom = 'Chờ xác nhận'
            r.save().then(StatusRoomUpdate => {
                Listbill({
                    Roomid: req.body.Roomid,
                    sophong: req.body.sophong,
                    hoten: req.body.hoten,
                    sdt: req.body.sdt,
                    loaiPhong: req.body.loaiPhong,
                    hangPhong: req.body.hangPhong,
                    cccd: req.body.cccd,
                    email: req.body.email,
                    ngaynhan: req.body.ngaynhan,
                    ngayTra: req.body.ngayTra,
                    sodem: req.body.sodem,
                    soNguoi: req.body.soNguoi,
                    gioNhanPhong: req.body.gioNhanPhong,
                    gioTra: req.body.gioTra,
                    giaPhong: req.body.giaPhong,
                }).save()
                res.json({
                    message: 'post thành công',
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

    canceWaitlRoom(req, res) {

        if (req.body.Roomid == null) {
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền ít nhất Roomid',
                isSuccess: false
            })
            return
        }
        ThongBaoDatPhong.findOne({
            _id: req.body.Roomid
        }).then(r => {
            if (r == null) {
                res.json({
                    message: 'Không tìm thấy room'
                })
                return;
            }
            ListAllRoom.findOne({_id: r.Roomid}).then(room => {
                if (room.statusRoom == 'Hết phòng') {
                    res.json({
                        message: 'Phòng này đã Đặt, Không thể hủy',
                        isSuccess: true
                    })
                    return;
                }
                if (room.statusRoom == 'Còn phòng') {
                    res.json({
                        message: 'Phòng này chưa được đặt',
                        isSuccess: true
                    })
                    return;
                }
                console.log('trước>>>>>>>>>>>>>>>' + room.countCancel)
                room.statusRoom = 'Còn phòng'
                room.countCancel = Number(room.countCancel) + 1
                console.log('Sau>>>>>>>>>>>>>>>' + room.countCancel)
                room.save().then(rom => {
                    ThongBaoDatPhong.findByIdAndRemove(r._id, function (error, room) {
                        if (error) {
                            res.json({
                                mes: 'Lỗi hủy đặt phòng'
                            });
                        } else {
                            res.json({
                                message: 'Hủy thành công',
                                isSuccess: true
                            });
                        }
                    })
                }).catch(e => res.json({
                    mes: 'Lỗi ' + e.message
                }))
            })


            console.log('user:' + r + '>>>>' + req.body.Roomid)
        }).catch(e => {
            res.json({
                code: 404,
                message: e.message,
                isSuccess: false
            })
        })
    }

    getWaitToAcceptUser(req, res, next) {
        if (req.query.email == null) {
            res.json({
                message: 'Cần truyền Email',
                status: false
            })
            return;
        }
        Listbill.find({
            email: req.query.email
        }).then(History => res.json({
            isSuccess: true,
            count: History.length,
            code: 200,
            message: "success",
            data: History,
        })).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    }

}


module.exports = new DatPhongController()
