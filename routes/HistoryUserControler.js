const ListHistoryUser = require('../model/lich_su_dat_phong')


class HistoryUserControler {

    getHistoryUser(req, res, next) {
        if (req.query.email == null) {
            res.json({
                message: 'Cần truyền Email',
                status: false
            })
            return;
        }
        ListHistoryUser.find({
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

    deleteHistory(req, res) {
        if (req.body.id == null) {
            res.json({message: 'Cần truyền params id', status: false, code: 200,})
            return
        }
        ListHistoryUser.deleteOne({_id: req.body.id}, function (err) {
            if (err) {
                res.json({message: 'Delete failed', status: false, err: err})
                return
            }
            res.json({
                message: 'Delete success',
                status: true,
                code: 200
            });
        })
    }

    deleteAllHistory(req, res) {
        if (req.body.email == null) {
            res.json({message: 'Cần truyền params id', status: false, code: 200,})
            return
        }
        ListHistoryUser.deleteMany({email: req.body.email}, function (err) {
            if (err) {
                res.json({message: 'Delete failed', status: false, err: err})
                return
            }
            res.json({
                message: 'Delete success',
                status: true,
                code: 200
            });
        })
    }

}


module.exports = new HistoryUserControler()
