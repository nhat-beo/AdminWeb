const Datphongs = require('../model/dat_phong/Dat_phong')


class APi {


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

}

module.exports = new APi()