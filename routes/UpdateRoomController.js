const ListAllRoom = require('../model/room')
const Listbill = require('../model/dat_phong/Dat_phong')
const ListUser = require('../model/tai_khoan')


class UpdateRoomController {
    async insertRoom(req, res) {

        if (req.body.Roomid == null) {
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền ít nhất RoomsId',
                isSuccess: false
            })
            return
        }
        //var user = await ListUser.findOne({_id: req.body.userid})

        ListAllRoom.findOne({
            _id: req.body.Roomid
        }).then(r => {
            console.log('user:'+r + '>>>>'+req.body.Roomid)
            r.maPhong = req.body.maPhong

            r.save()
            // Listbill({
            //     maPhong: r._id,
            //     hoten: req.body,
            //     loaiPhong: String,
            //     cmnd: String,
            //     email: String,
            //     soPhong:String,
            //     giaPhong: Number,
            //     datChoMinh: Boolean,
            //     datChoNguoiKhac: Boolean,
            //     ngayNhan: String,
            //     ngayTra: String,
            //     soDem: Number,
            //     soNguoi: Number,
            //     gioNhanPhong: String,
            //     gioTraPhong: String,
            //     sdt: Number,
            // })
        }).catch(e => {
            res.json({
                code: 404,
                message: e.message,
                isSuccess: false
            })
        })
    }

}


module.exports = new UpdateRoomController()