const ListHistoryUser = require('../model/lich_su_dat_phong')


class GetTopRoomFavorite {


    getTopRoom(req, res, next) {

        ListHistoryUser.find({}).then(History => res.json({
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