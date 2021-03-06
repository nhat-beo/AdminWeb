var express = require('express');
var router = express.Router();
var datPhong = require('../model/dat_phong/Dat_phong');
var lichSuDatPhong = require('../model/lich_su_dat_phong');
var Rooms = require('../model/room');
var ThongBaoDatPhong = require('../model/thong_bao_dat_phong');


var FCM = require('fcm-node');
var serverKey = 'AAAA5zhfLos:APA91bHUP5R25rIF7OtGEOlJB26BgNCyBUv1JKBShz6wmr9yLnJZqIlF4GBi4qdPgfIskibob7z1UHz42kOilxhvp2YHYOv_8nszalz2lukvjGgu8xRd_El8WE-ynhg0mgix-uruduig'; //put your server key here
var fcm = new FCM(serverKey);
// var thongBaoDatPhong = await ThongBaoDatPhong.find({})
// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: 'fLOsTLcTTha2PhwP_7vD-G:APA91bHUmMPurTdMk_LQpKvvIS4XUwbrJfRB0jriJxqAVbhVGIWm_k1NEXJJIOukazgCu1std0X30mTMBwz9aqqzDMV5_HZylCACmf0rYojhPZZeLJypoCzTDrrQaB6NygNEtM_imj-2',
//     collapse_key: 'your_collapse_key',
//
//     notification: {
//         title: 'FBooking Hotel',
//         body: 'Xin chào, Khách sạn đã xác nhận đơn đặt phòng của bạn'
//     },
//
//     data: {  //you can send only notification or only data(or include both)
//         my_key: 'my value',
//         my_another_key: 'my another value'
//     }
// };

//Multer
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
    // , fileFilter: function (req, file, cb) {
    //   if (file.size === 2) {
    //     cb (null, true);
    //   } else {
    //     // cb (new Error("Chỉ được lưu loại ảnh jpg"));
    //     cb (null, false);
    //     return cb (new Error("Chỉ được lưu tối đa 2 ảnh"));
    //   }
    // }
}).array('roomPhoto', 5);

//Body parser
var bodyParser = require('body-parser')
router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// getting-started.js
const mongoose = require('mongoose');
const {float} = require("tailwindcss/lib/plugins");
const {NetworkAuthenticationRequire} = require('http-errors');
const thong_bao_dat_phong = require('../model/thong_bao_dat_phong');
const lich_su_dat_phong = require('../model/lich_su_dat_phong');
const text = require("body-parser/lib/types/text");
mongoose.connect('mongodb+srv://admin:minhminh@cluster0.hiqs0.mongodb.net/bFpolyHotel?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Succesfully');
});

// Định nghĩa 1 collection trong schemasw
var room_schema = new mongoose.Schema({
    roomPhoto: Array,
    roomNumber: String,
    typeRoom: String,
    rankRoom: String,
    peopleRoom: String,
    priceRoom: Number,
    statusRoom: String,
    description: String,
    wifi: Boolean,
    parking: Boolean,
    receptionist: Boolean,
    gym: Boolean,
    roomMeeting: Boolean,
    laundry: Boolean,
    pool: Boolean,
    restaurant: Boolean,
    elevator: Boolean,
    wheelChairWay: Boolean,
    shuttle: Boolean,
    other: Boolean,
    otherText: String,
    countCancel: {type: Number, default: 0},
    countAccept: {type: Number, default: 0},
    favorite: {type: Array, default: []},
    tang: Number,
});
// định nghĩa schmema account

var account_schema = new mongoose.Schema({
    gmail: String,
    passsword: String,
    name: String,
    birthday: String,
    phoneNumber: String,
    cccd: String,
});
router.get('/addAccount', function (req, res) {
    res.send("aa")
});

router.post('/addAccount', createUser);

function createUser(req, res) {
    var account = db.model('account', account_schema);
    return account({
        gmail: req.body.gmail,
        password: req.body.password,
        name: req.body.name,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
        cccd: req.body.cccd,
    })
        .save()
        .then((newUser) => {
            return res.status(201).json({
                success: true,
                message: 'New user created successfully',
                gmail: newUser.gmail,
                password: newUser.password,
                name: newUser.name,
                birthday: newUser.birthday,
                phoneNumber: newUser.phoneNumber,
                cccd: newUser.cccd, gmail: newUser.gmail,
                password: newUser.password,
                name: newUser.name,
                birthday: newUser.birthday,
                phoneNumber: newUser.phoneNumber,
                cccd: newUser.cccd,

            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}


/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('index')
});
router.post('/Login', function (req, res, next) {

    if (req.body.email == 'admin' && req.body.password == 'admin') {
        res.redirect('/ThongKe')


    } else {
        res.render('index', {
            message: 'Username or Password Invalid',
            currentUsername: req.body.email,
            currentPass: req.body.password
        })
    }
});

//Danh sach phong - chua hoat dong duoc
router.get('/Categories', function (req, res, next) {
    var room_model = db.model('room', room_schema);

    room_model.find({}, function (error, roomlist) {
        if (error) {
            res.send('Lỗi lấy thông tin: ' + error.message);
        } else {
            if (roomlist.length == 0) {
                res.render('Categories', {
                    message: 'Không có dữ liệu ...'
                });
            }
            var data = []
            for (var k = 0; k < roomlist.length; k++) {
                data.push({data: roomlist[k], index: k});
            }
            res.render('Categories', {room: data});
        }
    })
});
// search categri
router.get('/search_categori', function (req, res) {
    var room_model = db.model('room', room_schema);
    var title = req.query.name.trim();
    room_model.find({}, function (error, room) {
        var data = room.filter(function (item) {
            return item.roomNumber.toString().toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('Categories', {
                message: 'Không có dữ liệu ...'
            });
            return
        }
        var dataSeach = [];
        for (var i = 0; i < data.length; i++) {
            dataSeach.push({data: data[i], index: i});
        }
        res.render('Categories', {
            room: dataSeach
        });
    })
    //

})
//statusRoom
//Dat phong
router.get('/DatPhong', function (req, res, next) {
    lichSuDatPhong.find({}, function (err, datPhong) {
        var index = 0;
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            var data = []
            for (var i = 0; i < datPhong.length; i++) {

                data.push({data: datPhong[i], index: index});
                index++;
            }
            res.render('DatPhong', {datPhong: data})
        }
    })
});

router.get('/ThemHoaDon', function (req, res, next) {
    datPhong.find({}, function (err, datPhong) {
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            res.render('ThemHoaDon', {datPhong: datPhong})
        }
    })
});
router.post('/ThemHoaDon', function (req, res, next) {
    datPhong({
        maPhong: req.body.id_phong,
        hoten: req.body.hoten,
        loaiPhong: req.body.loaiPhong,
        cmnd: req.body.cmnd,
        email: req.body.email,
        soPhong: req.body.soPhong,
        giaPhong: req.body.giaPhong,
        ngayNhan: req.body.ngayNhan,
        ngayTra: req.body.ngayTra,
        soDem: req.body.soDem,
        soNguoi: req.body.soNguoi,
        gioNhanPhong: req.body.gioNhanPhong,
        gioTraPhong: req.body.gioTraPhong,
        tongTien: req.body.tongTien,
        sdt: req.body.sdt,
    }).save(function (err) {
        if (err) {
            res.send("Thêm hoá đơn k thành công " + err);
        } else {
            lichSuDatPhong({
                maPhong: req.body.id_phong,
                hoten: req.body.hoten,
                loaiPhong: req.body.loaiPhong,
                cmnd: req.body.cmnd,
                email: req.body.email,
                soPhong: req.body.soPhong,
                giaPhong: req.body.giaPhong,
                ngayNhan: req.body.ngayNhan,
                ngayTra: req.body.ngayTra,
                soDem: req.body.soDem,
                soNguoi: req.body.soNguoi,
                gioNhanPhong: req.body.gioNhanPhong,
                gioTraPhong: '12:00 PM',
                tongTien: req.body.tongTien,
                sdt: req.body.sdt,
            }).save(function (err) {
                if (err) {
                    res.send("Thêm hoá đơn k thành công " + err);
                } else {
                    console.log(">>>>" + req.body.id_phong)
                    res.redirect("/DatPhong");
                }
            })
        }
    })
});
// tim kiem bill 
router.get('/search_bill', function (req, res) {
    var title = req.query.name.trim();
    // var allDate = null
    // let startDay = null;
    // let endDay = null;
    // if (allDate != null) {
    //     allDate = req.query.datefilter2;
    //     console.log('allDate1>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + allDate)
    //     startDay = allDate.slice(0, 10)
    //     endDay = allDate.slice(-10)
    // }
    // console.log('allDate2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + allDate)
    // console.log('startDay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + startDay)
    // console.log('endDay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + endDay)
    lichSuDatPhong.find({
        // ngayTra: {$gte: startDay, $lt: endDay}

    }, function (error, datPhong) {
        if (error) {
            res.send(error.message)
            return
        }
        var data = datPhong.filter(function (item) {
            return item.ngayNhan.toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('DatPhong', {
                message: 'Không có dữ liệu ...'
            });
            return
        }
        var dataSearch = [];
        for (var i = 0; i < data.length; i++) {
            dataSearch.push({data: data[i], index: i});
        }
        res.render('DatPhong', {
            datPhong: dataSearch
        });
        return
    })
    //
})
//xoahoadon
router.get('/delete_bill_datPhong.id=:id', function (req, res, next) {
    lichSuDatPhong.findByIdAndRemove(req.params.id, function (error, account) {
        if (error) {
            res.send("Xoá không thành công" + error);
        } else {
            res.redirect('/DatPhong');
        }
    })
});
//Themphong
router.post('/add_room', upload, function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.find({}).then(r => {
        for (var i of r) {
            if (i.roomNumber == (req.body.roomNumber)) {
                res.render('ThemPhong', {
                    message: 'Phòng đã tồn tại.'
                });
                console.log('>>>>>>>>> ' + i.roomNumber + '>>>>>>>>>>>>' + req.body.roomNumber)
                return
            }
        }
        room_model({
            roomPhoto: req.files,
            roomNumber: req.body.roomNumber.trim(),
            typeRoom: req.body.typeRoom.trim(),
            rankRoom: req.body.rankRoom.trim(),
            peopleRoom: req.body.peopleRoom,
            priceRoom: req.body.priceRoom,
            statusRoom: req.body.statusRoom,
            description: req.body.description,
            wifi: req.body.wifi === 'on' ? true : false,
            parking: req.body.parking === 'on' ? true : false,
            receptionist: req.body.receptionist === 'on' ? true : false,
            gym: req.body.gym === 'on' ? true : false,
            roomMeeting: req.body.roomMeeting === 'on' ? true : false,
            laundry: req.body.laundry === 'on' ? true : false,
            pool: req.body.pool === 'on' ? true : false,
            restaurant: req.body.restaurant === 'on' ? true : false,
            elevator: req.body.elevator === 'on' ? true : false,
            wheelChairWay: req.body.wheelChairWay === 'on' ? true : false,
            shuttle: req.body.shuttle === 'on' ? true : false,
            other: req.body.other === 'on' ? true : false,
            otherText: req.body.otherText,
            tang: req.body.tang,
        }).save(function (error, r) {
            if (error) {
                res.send("Lỗi thêm thông tin");
            } else {

                res.redirect("/Categories");

            }
        });
    }).catch(e => res.send('Lỗi'))


});

//Xoa phong
router.get('/delete_room.id=:id', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.findByIdAndRemove(req.params.id, function (error, room) {
        if (error) {
            res.send("Lỗi xóa thông tin");
        } else {
            res.redirect('/Categories');
        }
    })
});

//Sua phong
/* Update */
router.get('/update_room.id=:id', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.findOne({_id: req.params.id}, function (error, room) {
        if (error) {
            res.send("Lỗi sửa thông tin" + error);
        } else {
            res.render('SuaPhong', {room: room});
        }
    })
});

router.post('/update_room.id=:id', upload, function (req, res, next) {
    var room_model = db.model('room', room_schema);
    console.log(req.files)
    room_model.findByIdAndUpdate(req.params.id, {
        roomNumber: req.body.roomNumber,
        typeRoom: req.body.typeRoom,
        rankRoom: req.body.rankRoom,
        peopleRoom: req.body.peopleRoom,
        priceRoom: req.body.priceRoom,
        statusRoom: req.body.statusRoom,
        description: req.body.description,
        wifi: req.body.wifi === 'on' ? true : false,
        parking: req.body.parking === 'on' ? true : false,
        receptionist: req.body.receptionist === 'on' ? true : false,
        gym: req.body.gym === 'on' ? true : false,
        roomMeeting: req.body.roomMeeting === 'on' ? true : false,
        laundry: req.body.laundry === 'on' ? true : false,
        pool: req.body.pool === 'on' ? true : false,
        restaurant: req.body.restaurant === 'on' ? true : false,
        elevator: req.body.elevator === 'on' ? true : false,
        wheelChairWay: req.body.wheelChairWay === 'on' ? true : false,
        shuttle: req.body.shuttle === 'on' ? true : false,
        other: req.body.other === 'on' ? true : false,
        otherText: req.body.otherText,
        tang: req.body.tang
    }, function (error) {
        if (error) {
            res.send("Lỗi sửa thông tin " + error.message);
        } else {

            room_model.findOne({_id: req.params.id}, function (error, room) {
                if (error) {
                    res.send("Lỗi sửa thông tin" + error);
                } else {
                    if (req.files != null && req.files.length > 0) {
                        room.roomPhoto = req.files
                        room.save().then(r => res.redirect('/Categories')).catch(e => res.send('Loi ' + e.message))
                    } else {
                        res.redirect('/Categories');
                    }

                    // res.json(room);
                    // res.render('SuaPhong', {room: room});

                }
            })
        }
    });
});
// sua hoa don ssss
router.get('/sua_hoadon', function (req, res, next) {
    // var room_model = db.model('room', room_schema);
    lich_su_dat_phong.findOne({_id: req.query.id}, function (error, room) {
        if (error) {
            res.send("Lỗi sửa thông tin" + error);
        } else {
            console.log(room)

            res.render('SuaHoaDon', {room: room});
        }
    })
});
/// posrt sua sss
router.post('/sua_hoadon.id=:id', upload, function (req, res, next) {
    lich_su_dat_phong.findByIdAndUpdate(req.params.id, {
        maPhong: req.body.maPhong,
        hoten: req.body.hoten,
        loaiPhong: req.body.loaiPhong,
        cmnd: req.body.cmnd,
        email: req.body.email,
        soPhong: req.body.soPhong,
        giaPhong: req.body.giaPhong,
        datChoMinh: req.body.datChoMinh,
        datChoNguoiKhac: req.body.datChoNguoiKhac,
        ngayNhan: req.body.ngayNhan,
        ngayTra: req.body.ngayTra,
        soDem: req.body.soDem,
        soNguoi: req.body.soNguoi,
        gioNhanPhong: req.body.gioNhanPhong,
        gioTraPhong: req.body.gioTraPhong,
        sdt: req.body.sdt,
        tongTien: req.body.tongTien
    }, function (error) {
        if (error) {
            res.send("Lỗi sửa thông tin");
        } else {
            lich_su_dat_phong.findOne({_id: req.params.id}, function (error, room) {
                if (error) {
                    res.send("Lỗi sửa thông tin" + error);
                } else {
                    console.log(req.params.id)
                    // res.send("Sửa thông tin thành công");
                    // res.json(room);
                    // res.render('SuaPhong', {room: room});
                    res.redirect('DatPhong');
                }
            })
        }
    });
});


//Doi mat khau
router.get('/DoiMatKhau', function (req, res, next) {
    res.render('DoiMatKhau',);
});

router.get('/TaiKhoan', function (req, res, next) {
    var account = db.model('account', account_schema);

    account.find({}, function (error, account) {
        var index = 0;
        if (error) {
            res.send("Lỗi sửa thông tin" + error);
        } else {
            var data = []
            for (var i = 0; i < account.length; i++) {

                data.push({data: account[i], index: index});
                index++;
            }
            res.render('TaiKhoan', {account: data});
        }
    })
});
// xoa tai khoan
router.get('/delete_account.id=:id', function (req, res, next) {
    var account = db.model('account', account_schema);
    account.findByIdAndRemove(req.params.id, function (error, account) {
        if (error) {
            res.send("Xoá không thành công" + error);
        } else {
            res.redirect('/TaiKhoan');
        }
    })
});

// tim kiem tai khoan
router.get('/search', function (req, res) {
    var account = db.model('account', account_schema);
    var title = req.query.name;
    account.find({}, function (error, account) {
        var data = account.filter(function (item) {
            return item.name.toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        // console.log(data);
        if (data.length == 0) {
            res.render('TaiKhoan', {
                message: 'Không có dữ liệu ...'
            });
        }
        var dataSearch = [];
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            dataSearch.push({data: data[i], index: i});
        }
        res.render('TaiKhoan', {
            account: dataSearch
        });
    })
    //
})
// hoa don
router.get('/update_bill.id=:id', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.findOne({_id: req.params.id}, function (error, room) {
        if (error) {
            res.send("Lỗi thêm thông tin" + error);
        } else {
            room.statusRoom = 'Hết phòng'
            room.save()
            res.render('ThemHoaDon', {room: room});
        }
    })
});
// sửa hóa đơn

//thong kê
router.get('/ThongKe', async function (req, res, next) {
    var allDate = req.query.datefilter;
    console.log('allDate>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + allDate)
    let startDay = '';
    let endDay = '';
    if (allDate == null || allDate == '') {
        startDay = '2000-1-01'
        endDay = '2050-01-01'
    } else {
        startDay = allDate.slice(0, 10);
        endDay = allDate.slice(-10);
    }
    // let startDay = allDate.slice(0, 10);
    // let endDay = allDate.slice(-10);
    // let startDay = '2013-01-01'
    // let endDay = '2023-01-01'
    console.log('startDay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + startDay)
    console.log('endDay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:' + endDay)
    let listPhongDaDat = [];
    let Revenue = 0;
    let RevPAR = 0;
    let ALOS = 0
    let LuotKhach = 0;
    var tongLuotDat = 0
    var tongLuotHuy = 0
    var tiLeThanhCong = 0
    var tiLeHuy = 0
    // ngayTra: {$gte: startDay, $lt: endDay}
    var listPhong = await Rooms.find({})
    var listPhongDat = await lich_su_dat_phong.find({ngayTra: {$gte: startDay, $lt: endDay}, isTheCancel: true,})
    var thongBaoDatPhong = await ThongBaoDatPhong.find({})
    lich_su_dat_phong.find({
        ngayTra: {$gte: startDay, $lt: endDay}
    }, function (err, lichSuDatPhong) {
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            lich_su_dat_phong.find({
                // isTheCancel: false,
                ngayTra: {$gte: startDay, $lt: endDay}
            }, function (err, lichsu) {
                if (err) {
                    res.send('Lỗi lấy thông tin: ' + err.message);
                } else {
                    var index = 0;
                    lichsu.forEach((value => {
                        // index++
                        tongLuotHuy = listPhongDat.length
                        // tongLuotDat = lichsu.length
                        // tiLeThanhCong = (tongLuotDat * 100) / (Number(tongLuotDat) + Number(tongLuotHuy))
                        // tiLeHuy = (tongLuotHuy * 100) / (Number(tongLuotDat) + Number(tongLuotHuy))
                    }))
                }
                var index = 0;
                lichsu.forEach((value) => {
                    index++
                    //todo
                    tongLuotDat = lichsu.length - tongLuotHuy
                    console.log('tong luot dat:' + tongLuotDat)
                    console.log('tong luot huy:' + tongLuotHuy)
                    tiLeThanhCong = (tongLuotDat * 100) / (Number(tongLuotDat) + Number(tongLuotHuy))
                    tiLeHuy = (tongLuotHuy * 100) / (Number(tongLuotDat) + Number(tongLuotHuy))
                    Revenue += (value.soDem * value.giaPhong + (value.soDem * value.giaPhong * 0.1)) / 100000;
                    LuotKhach += Number(value.soNguoi)
                    RevPAR = Revenue / listPhong.length;
                    ALOS += value.soDem / listPhong.length
                });
                res.render('ThongKe', {
                    RevPAR: RevPAR,
                    LuotKhach: LuotKhach,
                    tongdoanhThu: Revenue.toFixed(2),
                    thongKe: listPhongDaDat,
                    ALOS: ALOS.toFixed(1),
                    thongBaoDatPhong: thongBaoDatPhong,
                    tongLuotDatPhong: tongLuotDat,
                    tongLuotHuyPhong: tongLuotHuy,
                    tiLeThanhCong: tiLeThanhCong.toFixed(5),
                    tiLeHuy: tiLeHuy.toFixed(5)
                })
            })
        }
    })
});
//
router.get('/delete_phong_het.id=:id', function (req, res, next) {
    Rooms.findOne({_id: req.params.id}).then(dp => {
        if (dp != null) {
            dp.statusRoom = 'Còn phòng';
            dp.save()
            console.log('trạng thái' + dp.statusRoom)
            lich_su_dat_phong.findOne({maphong: dp.maPhong}).then(r => {
                const giaPhong = r.tongTien / r.soDem
                const curDate = new Date();
                const timeTraPhong = new Date(r.ngayTra);
                const onlyNgayTraPhong = timeTraPhong.getDate()
                const timeNhanPhong = new Date(r.ngayNhan);
                const onlyNgayNhanPhong = timeNhanPhong.getDate()
                const dayNow = curDate.getDate();
                const gioTraPhongReal = curDate.getHours()
                const soNgayConLai = onlyNgayTraPhong - dayNow;
                // const tongTien;
                console.log('ngày hiện tại:' + dayNow)
                console.log('thời gian trả phòng:' + timeTraPhong)
                console.log('ngày trả phòng:' + onlyNgayTraPhong)
                console.log('Số ngày Còn lại:' + soNgayConLai)
                console.log('Tổng tiền trên mong:' + r.tongTien)
                console.log('giờ trả phòng:' + gioTraPhongReal)
                console.log('ngày nhận phòng:' + onlyNgayNhanPhong)
                if (soNgayConLai < r.soDem) {
                    const tongTien = r.tongTien - giaPhong * soNgayConLai
                    // res.redirect('/DatPhong')
                    r.isTheCancel = false
                    r.tongTien = tongTien;
                    console.log("before" + tongTien)
                    if (gioTraPhongReal > 12 || gioTraPhongReal < 15) {
                        r.tongTien = tongTien + 0.3 * giaPhong
                        r.isTheCancel = false
                    } else if (gioTraPhongReal >= 15 || gioTraPhongReal < 18) {
                        r.tongTien = tongTien + 0.5 * giaPhong
                        r.isTheCancel = false
                    } else {
                        r.tongTien = tongTien + giaPhong
                        r.isTheCancel = false
                    }
                } else if (soNgayConLai == r.soDem || gioTraPhongReal >= r.gioNhanPhong) {
                    r.tongTien = giaPhong
                    r.isTheCancel = false
                } else if (soNgayConLai == r.soDem || gioTraPhongReal < r.gioNhanPhong) {
                    r.tongTien = 1000000
                    r.isTheCancel = true
                    // res.redirect('/DatPhong')
                } else {
                    r.tongTien = 1000000
                    r.isTheCancel = true
                }
                console.log("after" + r.tongTien)
                ThongBaoDatPhong.findByIdAndRemove(req.query.id, function (error, room) {
                    if (error) {
                        res.send("Lỗi xóa thông tin");
                    } else {
                        res.redirect("/DatPhong");
                    }
                })
                r.save().then(r => {
                    // ThongBaoDatPhong.findByIdAndRemove(req.params.id, function (error, account) {
                    //     if (error) {
                    //         res.send("Xoá không thành công" + error);
                    //     } else {
                    //         res.redirect('/HetHanTrongNgay');
                    //     }
                    // })
                    console.log("tongtiencuoi" + r.tongTien)
                }).catch(e => res.send('Lỗi ' + e.message))
            })
        }
    })
});


//get thong bao dat phong

router.get('/SuaHoaDon', function (req, res, next) {
    res.render('SuaHoaDon',);
});

router.get('/ThemPhong', function (req, res, next) {
    res.render('ThemPhong',);
});

router.get('/SuaPhong', function (req, res, next) {
    res.render('SuaPhong',);
});

router.get('/HetHanTrongNgay', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.find({statusRoom: 'Hết phòng'}).then((room) => {
            var dataSearch = [];
            for (var i = 0; i < room.length; i++) {
                dataSearch.push({data: room[i], index: i});
            }
            res.render('PhongHet', {
                room: dataSearch
            })
        }
    )
})
;
//search phong het
router.get('/search_phong_het', function (req, res) {
    var room_model = db.model('room', room_schema);
    var title = req.query.name.trim();
    room_model.find({}, function (error, room) {
        var data = room.filter(function (item) {
            return item.roomNumber.toString().toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('PhongHet', {
                message: 'Không có dữ liệu ...'
            });
        }
        var dataSeach = [];
        for (var i = 0; i < data.length; i++) {
            dataSeach.push({data: data[i], index: i});
        }
        res.render('PhongHet', {
            room: dataSeach
        });
    })
})
//xoa phong het
router.get('/delete_room_het.id=:id', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.findByIdAndRemove(req.params.id, function (error, room) {
        if (room.length == 0) {
            res.render('PhongHet', {
                message: 'Không có dữ liệu ...'
            });
        }
        if (error) {
            res.send("Lỗi xóa thông tin");
        } else {
            res.redirect('/HetHanTrongNgay');
        }
    })
});
// PhongTrong
router.get('/PhongTrong', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.find({statusRoom: 'Còn phòng'}).then((room) => {
            var dataSearch = [];
            for (var i = 0; i < room.length; i++) {
                dataSearch.push({data: room[i], index: i});
            }
            res.render('PhongTrong', {
                room: dataSearch
            })

        }
    )
});

// lichSuDatphong
router.get('/LichSuDatPhong', function (req, res, next) {
    lichSuDatPhong.find({isTheCancel: false}, function (err, datPhong) {
        var index = 0;
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            var data = []
            for (var i = 0; i < datPhong.length; i++) {

                data.push({data: datPhong[i], index: index});
                index++;
            }
            res.render('DatPhong', {datPhong: data})
        }
    })
});

// lichSuHuyphong
router.get('/lichSuHuyphong', function (req, res, next) {
    lichSuDatPhong.find({isTheCancel: true}, function (err, datPhong) {
        var index = 0;
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            var data = []
            for (var i = 0; i < datPhong.length; i++) {

                data.push({data: datPhong[i], index: index});
                index++;
            }
            res.render('DatPhong', {datPhong: data})
        }
    })
});


// search phong trong
router.get('/search_phong_trong', function (req, res) {
    var room_model = db.model('room', room_schema);
    var title = req.query.name.trim();
    room_model.find({}, function (error, room) {
        var data = room.filter(function (item) {
            return item.roomNumber.toString().toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('PhongTrong', {
                message: 'Không có dữ liệu ...'
            });
        }
        var dataSeach = [];
        for (var i = 0; i < data.length; i++) {
            dataSeach.push({data: data[i], index: i});
        }
        res.render('PhongTrong', {
            room: dataSeach
        });
    })
})
//Xoa phong
router.get('/delete_room_trong.id=:id', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.findByIdAndRemove(req.params.id, function (error, room) {
        if (room.length == 0) {
            res.render('PhongTrong', {
                message: 'Không có dữ liệu ...'
            });
        }
        if (error) {
            res.send("Lỗi xóa thông tin");
        } else {
            res.redirect('/PhongTrong');
        }
    })
});
router.get('/SapHetHan', function (req, res, next) {
    var listRoomExpired = [];
    datPhong.find({},).then((value) => {
        const dateNow = Date.now();
        for (var p of value) {
            var date = new Date(p.ngayTra).getTime();
            var dateExpired = date - dateNow;
            // console.log("1>>>" + date)
            // console.log("2>>>" + dateNow)
            // console.log("3>>>" + dateExpired)
            console.log("\n \n \n \n\n \n\n \n\n \n\n \n")
            if (dateExpired < 0) {
                listRoomExpired.push(p)
            }
        }
        var dataSearch = [];
        for (var i = 0; i < listRoomExpired.length; i++) {
            dataSearch.push({data: listRoomExpired[i], index: i});
        }
        res.render('SapHetHan', {datPhong: dataSearch});
    });


});
//search phong het han
router.get('/search_phong_het_han', function (req, res) {
    var title = req.query.name.trim();
    datPhong.find({}, function (error, datPhong) {
        var data = datPhong.filter(function (item) {
            return item.hoten.toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('SapHetHan', {
                message: 'Không có dữ liệu ...'
            });
        }
        var dataSearch = [];
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            dataSearch.push({data: data[i], index: i});
        }
        res.render('SapHetHan', {
            datPhong: dataSearch
        });
    })

})
//xoa phong het
router.get('/delete_phong_sap_het.id=:id', function (req, res, next) {

    datPhong.findOne({_id: req.params.id}).then(dp => {
        lich_su_dat_phong.findOne({maphong: dp.maPhong}).then(r => {
            const giaPhong = r.tongTien / r.soDem
            const curDate = new Date();
            const timeTraPhong = new Date(r.ngayTra);
            const onlyNgayTraPhong = timeTraPhong.getDate()
            const timeNhanPhong = new Date(r.ngayNhan);
            const onlyNgayNhanPhong = timeNhanPhong.getDate()
            const dayNow = curDate.getDate();
            const gioTraPhongReal = curDate.getHours()
            const soNgayConLai = onlyNgayTraPhong - dayNow;
            const soNgayTraMuon = dayNow - onlyNgayTraPhong;
            // const tongTien;
            console.log('ngày hiện tại:' + dayNow)
            console.log('thời gian trả phòng:' + timeTraPhong)
            console.log('ngày trả phòng:' + onlyNgayTraPhong)
            console.log('Số ngày Còn lại:' + soNgayConLai)
            console.log('Tổng tiền trên mong:' + r.tongTien)
            console.log('giờ trả phòng:' + gioTraPhongReal)
            console.log('ngày nhận phòng:' + onlyNgayNhanPhong)
            if (soNgayConLai > r.soDem) {
                const tongTien = r.tongTien + giaPhong * soNgayTraMuon
                // res.redirect('/DatPhong')
                r.isTheCancel = false
                r.tongTien = tongTien;
                console.log("before" + tongTien)
                if (gioTraPhongReal > 12 || gioTraPhongReal < 15) {
                    r.tongTien = tongTien + 0.3 * giaPhong
                    r.isTheCancel = false
                } else if (gioTraPhongReal >= 15 || gioTraPhongReal < 18) {
                    r.tongTien = tongTien + 0.5 * giaPhong
                    r.isTheCancel = false
                } else {
                    r.tongTien = tongTien + giaPhong
                    r.isTheCancel = false
                }
            }
            console.log("after" + r.tongTien)
            r.save().then(r => {
                // ThongBaoDatPhong.findByIdAndRemove(req.params.id, function (error, account) {
                //     if (error) {
                //         res.send("Xoá không thành công" + error);
                //     } else {
                //         res.redirect('/HetHanTrongNgay');
                //     }
                // })
            }).catch(e => res.send('Lỗi ' + e.message))
        })

        if (dp != null) {
            var room_model = db.model('room', room_schema);
            room_model.findOne({_id: dp.maPhong}).then(r => {
                r.statusRoom = 'Còn phòng'
                r.save().then(r => {
                    datPhong.findByIdAndRemove(req.params.id, function (error, account) {
                        if (error) {
                            res.send("Xoá không thành công" + error);
                        } else {
                            res.redirect('/SapHetHan');
                        }
                    })
                }).catch(e => res.send('Lỗi ' + e.message))
            })
        }
    })


});
// xac nhan thong bao
router.get('/xacNhan_thong_bao', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    const today = new Date()
    var time = (today.getHours() + 15) + ":" + today.getMinutes();
    console.log("<<<<<<<<<<<<<<<<<" + time)
    room_model.findOne({_id: req.query.Roomid}).then(r => {
        r.statusRoom = 'Hết phòng';
        r.countAccept = Number(r.countAccept) + 1;
        r.save().then(r => {
            //nothing todo
        }).catch(e => res.send('Lỗi ' + e.message))
    })
    thong_bao_dat_phong.findOne({_id: req.query.id}).then(tb => {
        lichSuDatPhong({
            maPhong: tb.id,
            hoten: tb.hoten,
            loaiPhong: tb.loaiPhong,
            cmnd: tb.cccd,
            email: tb.email,
            soPhong: tb.sophong,
            giaPhong: tb.giaPhong,
            ngayNhan: tb.ngaynhan,
            ngayTra: tb.ngayTra,
            soDem: tb.sodem,
            soNguoi: tb.soNguoi,
            gioNhanPhong: tb.gioNhanPhong,
            gioTraPhong: tb.gioTra,
            sdt: tb.sdt,
            tongTien: tb.tongTien,
            acceptDate: time,
            isTheUserDelete: true,
            isTheCancel: false
        }).save(function (err) {
            if (err) {
                res.send("Thêm hoá đơn k thành công " + err);
            } else {
                ThongBaoDatPhong.findByIdAndRemove(req.query.id, function (error, room) {
                    if (error) {
                        res.send("Lỗi xóa thông tin");
                    } else {
                        res.redirect("/DatPhong");
//                         console.log('Tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn:' + room.tokenUser)
                        fcm.send({ //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                            to: room.tokenUser,
                            collapse_key: 'your_collapse_key',

                            notification: {
                                title: 'FBooking Hotel',
                                body: 'Chào ' + room.hoten
                                    + '\nKhách sạn đã xác nhận đơn đặt phòng của bạn.'
                                    + '\nSố phòng: ' + room.sophong
                                    + '\nNgày nhận phòng: ' + room.ngaynhan
                            },

                            data: {  //you can send only notification or only data(or include both)
                                my_key: 'my value',
                                my_another_key: 'my another value'
                            }
                        }, function (err, response) {
                            if (err) {
                                console.log("Something has gone wrong!");
                            } else {
                                console.log("Successfully sent with response: ", response);
                            }
                        });
                    }
                })

            }
        })
    })
});
// huy thong bao
router.get('/delete_thong_bao', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    const today = new Date()
    var time = (today.getHours() + 15) + ":" + today.getMinutes();
    console.log("<<<<<<<<<<<<<<<<<" + time)
    room_model.findOne({_id: req.query.Roomid}).then(r => {
        r.statusRoom = 'Còn phòng';
        r.countCancel = Number(r.countCancel) + 1;
        r.save().then(r => {
            //nothing todo
        }).catch(e => res.send('Lỗi ' + e.message))
    })
    thong_bao_dat_phong.findOne({_id: req.query.id}).then(tb => {
        lichSuDatPhong({
            maPhong: tb.id,
            hoten: tb.hoten,
            loaiPhong: tb.loaiPhong,
            cmnd: tb.cccd,
            email: tb.email,
            soPhong: tb.sophong,
            giaPhong: tb.giaPhong,
            ngayNhan: tb.ngaynhan,
            ngayTra: tb.ngayTra,
            soDem: tb.sodem,
            soNguoi: tb.soNguoi,
            gioNhanPhong: tb.gioNhanPhong,
            gioTraPhong: tb.gioTra,
            sdt: tb.sdt,
            tongTien: tb.tongTien,
            acceptDate: time,
            isTheUserDelete: false,
            iisTheCancel: true

        }).save(function (err) {
            if (err) {
                res.send("Thêm hoá đơn k thành công " + err);
            } else {
                ThongBaoDatPhong.findByIdAndRemove(req.query.id, function (error, room) {
                    if (error) {
                        res.send("Lỗi xóa thông tin");
                    } else {
                        res.redirect("/DatPhong");
//                         console.log('Tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn:' + room.tokenUser)
                        fcm.send({ //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                            to: room.tokenUser,
                            collapse_key: 'your_collapse_key',
                            notification: {
                                title: 'FBooking Hotel',
                                body: 'Chào ' + room.hoten
                                    + '\nKhách sạn đã Hủy đơn đặt phòng của bạn.'
                                    + '\nSố phòng: ' + room.sophong
                                    + '\nNgày nhận phòng: ' + room.ngaynhan
                            },
                            data: {  //you can send only notification or only data(or include both)
                                my_key: 'my value',
                                my_another_key: 'my another value'
                            }
                        }, function (err, response) {
                            if (err) {
                                console.log("Something has gone wrong!");
                            } else {
                                console.log("Successfully sent with response: ", response);
                            }
                        });
                    }
                })

            }
        })
    })
});
// router.get('/delete_thong_bao', function (req, res, next) {
//     console.log(req.query)
//     var room_model = db.model('room', room_schema);
//     room_model.findOne({_id: req.query.Roomid}).then(r => {
//         r.statusRoom = 'Còn phòng',
//             r.countCancel = Number(r.countCancel) + 1
//         r.save().then(r => {
//             ThongBaoDatPhong.findByIdAndRemove(req.query.id, function (error, room) {
//                 if (error) {
//                     res.send("Lỗi xóa thông tin");
//                 } else {
//                     res.redirect('/ThongKe');
//                 }
//             })
//         }).catch(e => res.send('Lỗi ' + e.message))
//     })
// });

router.use('/api', require('./api_router'))

// router.use('/notification', require('./PushNotification'))


router.get('*', function (req, res) {
    res.render('error')
});


module.exports = router;


