const User = require('../model/tai_khoan')

class UserController {
    //insert user:
    insertAcount(req, res, next) {
        if (req.body.gmail == null) {
            res.json({message: 'gmail không được trống'})
            return
        }
        var name = ''
        if (req.body.name == null) {
            name = ''
        } else {
            name = req.body.name
        }
        User({
            gmail: req.body.gmail,
            name: name,
            password: req.body.password,
            birthday: req.body.birthday,
            phoneNumber: req.body.phoneNumber,
            cccd: req.body.cccd,
        }).save().then(user => {
            res.json({
                message: "Thành công",
                isSuccess: true,
                code: 200
            })
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }

    //update
    updateAcount(req, res, next) {
        if (req.body.gmail == null) {
            res.json({message: 'Cân truyền gmail'})
            return
        }
        User.findOne({gmail: req.body.gmail}).then(user => {
            if (user == null) {
                res.json({message: "Acount không tồn tại, kiểm tra lại gmail", isSuccess: false})
            }
            user.gmail = req.body.gmail,
                user.name = req.body.name,
                user.password = req.body.password,
                user.birthday = req.body.birthday,
                user.phoneNumber = req.body.phoneNumber,
                user.cccd = req.body.cccd
            user.save().then(user => res.json(
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

    //get
    getAcount(req, res) {
        if (req.query.gmail == null) {
            res.json({
                isSuccess: false,
                message: "Cần truyền gmail",
                code: 404
            })
        }
        User.findOne({gmail: req.query.gmail}).then(user => {
            res.json({
                message: "success",
                isSuccess: true,
                code: 200,
                data: user
            })
        }).catch(e => res.json({
            isSuccess: false,
            message: e.message,
            code: 404
        }))
    }
}

module.exports = new UserController()
