const ListAllRoom = require('../model/room')
const Listbill = require('../model/dat_phong/Dat_phong')


class UpdateRoomController {
    insertOrUpdate(req, res) {

        if (req.body._id == null) {
            res.json({
                code: 404,
                message: 'Thiếu params. Cần truyền ít nhất RoomsId',
                isSuccess: false
            })
            return
        }

        ListAllRoom.findOne({
            userId: req.body.userId,
            lessonId: req.body.lessonId,
        }).then(process => {
            if (process == null) {
                var arr = []
                if (req.body.completed != null && req.body.completed != "")
                    arr.push(req.body.completed)
                process.statusRoom = 2
                process.save
                Listbill({
                    userId: req.body.userId,
                    lessonId: req.body.lessonId,
                    completed: arr,
                    status: (req.body.status != null && req.body.status != '') ? req.body.status : -1,
                    quizStatus: (req.body.quizStatus != null && req.body.quizStatus != '') ? req.body.quizStatus : -1,
                    quizMarked: req.body.quizMarked,
                    dateTime: req.body.dateTime,
                    lastModify: req.body.dateTime
                }).save().then(pr => {
                    res.json({
                        code: 200,
                        message: 'Thành công',
                        isSuccess: true,
                        process: pr
                    })
                }).catch(e => res.json({
                    code: 404,
                    message: e.message,
                    isSuccess: false
                }))
            } else {
                //change value:
                if (req.body.completed != null && req.body.completed != "") {
                    // var arrParams = eval(req.body.completed);
                    var arrCompleted = process.completed;
                    // for (var i in arrParams) {
                    if (!process.completed.includes(req.body.completed.toString().trim()))
                        arrCompleted.push(req.body.completed.toString().trim())
                    // }
                    process.completed = arrCompleted
                }
                if (req.body.status != null && req.body.status != '') {
                    process.status = req.body.status
                }
                if (req.body.quizStatus != null && req.body.quizStatus != '') {
                    process.quizStatus = req.body.quizStatus
                }
                if (req.body.quizMarked != null) {
                    process.quizMarked = req.body.quizMarked
                }
                if (req.body.quizStatus != null) {
                    process.lastModify = req.body.dateTime
                }

                process.save().then(pro => {
                    res.json({
                        code: 200,
                        message: 'Thành công',
                        isSuccess: true,
                        process: pro
                    })
                }).catch(e => res.json({
                    code: 404,
                    message: e.message,
                    isSuccess: false
                }))

            }
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