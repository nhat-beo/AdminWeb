const ListTopRoom = require('../model/room')


class GetTopRoomFavorite {


    getTopRoom(req, res, next) {

        ListTopRoom.find({

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


module.exports = new GetTopRoomFavorite()