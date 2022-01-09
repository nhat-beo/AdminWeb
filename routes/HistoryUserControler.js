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
            email: req.query.email,
            isTheUserDelete: true
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
        ListHistoryUser.findOne({_id: req.body.id}).then(history => {
            if (history == null) {
                res.json({message: "không có lịch sử này", isSuccess: false})
            }
            history.isTheUserDelete = false,
            history.save().then(user => res.json(
                {
                    message: "success",
                    isSuccess: true,
                    code: 200,
                    user: user
                })).catch(e => res.json(
                {
                    isSuccess: false,
                    message: e.message,
                    code: 404
                }))
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

    deleteAllHistory(req, res) {
        if (req.body.email == null) {
            res.json({message: 'Cần truyền params email', status: false, code: 200,})
            return
        }
        ListHistoryUser.find({email: req.body.email}).then(history => {
            if (history == null) {
                res.json({message: "không có lịch sử này", isSuccess: false})
            }
            history.isTheUserDelete = false,
                history.save().then(user => res.json(
                    {
                        message: "success",
                        isSuccess: true,
                        code: 200,
                        user: user
                    })).catch(e => res.json(
                    {
                        isSuccess: false,
                        message: e.message,
                        code: 404
                    }))
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

}


module.exports = new HistoryUserControler()
