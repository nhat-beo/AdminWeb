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

        Rooms.find({
            wifi: req.query.wifi,
            receptionist: req.query.receptionist,
            gym: req.query.gym,
            roomMeeting: req.query.roomMeeting,
            laundry: req.query.laundry,
            pool: req.query.pool,
            restaurant: req.query.restaurant,
            elevator: req.query.elevator,
            wheelChairWay: req.query.wheelChairWay,
            shuttle: req.query.shuttle,
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

module.exports = new APi_all_list()
