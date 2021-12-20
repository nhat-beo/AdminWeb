const ListTopRoom = require('../model/room')


class GetTopRoomFavorite {

    async getTopRoom(req, res, next) {
        var listTop = await ListTopRoom.find({}).sort({countAccept: -1}).limit(5)
        res.json({
            isSuccess: true,
            code: 200,
            message: "success",
            data: listTop
        })
    }
}


module.exports = new GetTopRoomFavorite()
