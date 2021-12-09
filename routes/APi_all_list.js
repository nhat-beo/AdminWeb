const Datphongs = require('../model/dat_phong/Dat_phong')
const Taikhoans = require('../model/tai_khoan')
const Rooms = require('../model/room')


class APi_all_list {


    getAlllistromed(req, res, next) {
        Datphongs.find({}).then(datphongs => res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: datphongs,
        })).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    }

    getAllAccount(req, res, next) {
        Taikhoans.find({

        }).then(taikhoans => res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: taikhoans,
        })).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    }

    getAllRooms(req, res, next) {

        Rooms.find({
            wifi: req.query.wifi,
            receptionist: req.query.receptionist,
        }).then(Rooms => res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: Rooms,
        })).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    }

    FilterRoom(req, res, next) {

        // var param =
        // console.log(params)
        // Rooms.find({ status: { $in: [ "A", "D" ] } }).then(Rooms => res.json({
        //     isSuccess: true,
        //     code: 200,
        //     message: "success",
        //     data: Rooms,
        // })).catch(e => res.json({
        //     status: false,
        //     message: e.message,
        //     code: 404
        // }))

        Rooms.find({
            wifi : req.query.wifi == null ? { $in: [ true, false ] } : req.query.wifi,
            receptionist: req.query.receptionist == null ? { $in: [ true, false ] } : req.query.receptionist,
            gym: req.query.gym == null ? { $in: [ true, false ] } : req.query.gym,
            roomMeeting: req.query.roomMeeting == null ? { $in: [ true, false ] } : req.query.roomMeeting,
            laundry: req.query.laundry == null ? { $in: [ true, false ] } : req.query.laundry,
            pool: req.query.pool == null ? { $in: [ true, false ] } : req.query.pool,
            restaurant: req.query.restaurant == null ? { $in: [ true, false ] } : req.query.restaurant,
            elevator: req.query.elevator == null ? { $in: [ true, false ] } : req.query.elevator,
            wheelChairWay: req.query.wheelChairWay == null ? { $in: [ true, false ] } : req.query.wheelChairWay,
            shuttle: req.query.shuttle == null ? { $in: [ true, false ] } : req.query.shuttle,
        }).then(Rooms => res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: Rooms,
        })).catch(e => res.json({
            status: false,
            message: e.message,
            code: 404
        }))
    }


}
class Param{

}

module.exports = new APi_all_list()
