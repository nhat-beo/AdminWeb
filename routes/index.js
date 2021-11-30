var express = require('express');
var router = express.Router();
var datPhong = require('../model/dat_phong/Dat_phong');

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
const { float } = require("tailwindcss/lib/plugins");
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
});

// định nghĩa schmema account

var account_schema = new mongoose.Schema({
    gmail: String,
    password: String,
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
    console.log({
        gmail: req.body.gmail,
        password: req.body.password,
        name: req.body.name,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
        cccd: req.body.cccd,
    })

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
        res.render('index', { message: 'Username or Password Invalid', currentUsername: req.body.email, currentPass: req.body.password })
    }
});

//Danh sach phong - chua hoat dong duoc
router.get('/Categories', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    var index = 0;

    room_model.find({}, function (error, roomlist) {
        if (error) {
            res.send('Lỗi lấy thông tin: ' + error.message);
        } else {

            datPhong.find({}).then(phong => {
                // for(var i = 0; i< roomlist.length; i++){
                //     for(var j = 0; j< phong.length; j++){
                //         if(roomlist[i]._id == phong[j].maPhong){
                //             roomlist.pop(roomlist[i])
                //             break
                //         }
                //     }
                // }
                for (var i of roomlist) {
                    for (var j of phong) {
                        if (i._id == j.maPhong) {
                            roomlist.pop(roomlist.indexOf(i))
                            phong.pop(phong.indexOf(j))
                            break
                        }
                    }
                }
                //1  5 6
                //2 4 6
                var data = []
                console.log(roomlist)
                for (var k = 0; k < roomlist.length; k++) {
                    data.push({ data: roomlist[k], index: k });
                }
                res.render('Categories', { room: data });
            })

        }
    })
});
// search categri
router.get('/search_categori', function (req, res) {
    var room_model = db.model('room', room_schema);
    var title = req.query.name;
    room_model.find({}, function (error, room) {
        var data = room.filter(function (item) {
            return item.roomNumber.toString().toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('Categories', {
                message: 'Không có dữ liệu ...'
            });
        }
        var dataSeach = [];
        for (var i = 0; i < data.length; i++) {
            dataSeach.push({ data: data[i], index: i });
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
    datPhong.find({}, function (err, datPhong) {
        var index = 0;
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            var data = []
            for (var i = 0; i < datPhong.length; i++) {

                data.push({ data: datPhong[i], index: index });
                index++;
            }
            res.render('DatPhong', { datPhong: data })
        }
    })
});

router.get('/ThemHoaDon', function (req, res, next) {
    datPhong.find({}, function (err, datPhong) {
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            res.render('ThemHoaDon', { datPhong: datPhong })
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
        datChoMinh: req.body.datChoMinh == 'Đặt cho bản thân' ? true : false,
        datChoNguoiKhac: req.body.datChoNguoiKhac == 'Đặt cho người khác' ? true : false,
        ngayNhan: req.body.ngayNhan,
        ngayTra: req.body.ngayTra,
        soDem: req.body.soDem,
        soNguoi: req.body.soNguoi,
        gioNhanPhong: req.body.gioNhanPhong,
        gioTraPhong: req.body.gioTraPhong,
        sdt: req.body.sdt,
    }).save(function (err) {
        if (err) {
            res.send("Thêm hoá đơn k thành công " + err);
        } else {
            res.redirect("/DatPhong");
        }
    })
});
// tim kiem bill 
router.get('/search_bill', function (req, res) {
    var title = req.query.name;
    datPhong.find({}, function (error, datPhong) {
        var data = datPhong.filter(function (item) {
            return item.hoten.toLowerCase().indexOf(title.toLowerCase()) !== -1
        });
        if (data.length == 0) {
            res.render('DatPhong', {
                message: 'Không có dữ liệu ...'
            });
        }
        var dataSearch = [];
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            dataSearch.push({ data: data[i], index: i });
        }
        res.render('DatPhong', {
            datPhong: dataSearch
        });
    })
    //
})
//xoa hoa don
router.get('/delete_bill_datPhong.id=:id', function (req, res, next) {
    datPhong.findByIdAndRemove(req.params.id, function (error, account) {
        if (error) {
            res.send("Xoá không thành công" + error);
        } else {
            res.redirect('/DatPhong');
        }
    })
});
//Them phong
router.post('/add_room', upload, function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model({
        roomPhoto: req.files,
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
    }).save(function (error) {
        if (error) {
            res.send("Lỗi thêm thông tin");
        } else {

            res.redirect("/Categories");
        }
    });
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
    room_model.findOne({ _id: req.params.id }, function (error, room) {
        if (error) {
            res.send("Lỗi sửa thông tin" + error);
        } else {
            res.render('SuaPhong', { room: room });
        }
    })
});

router.post('/update_room.id=:id', upload, function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.findByIdAndUpdate(req.params.id, {
        roomPhoto: req.files,
        roomNumber: req.body.roomNumber,
        typeRoom: req.body.typeRoom,
        rankRoom: req.body.rankRoom,
        peopleRoom: req.body.peopleRoom,
        priceRoom: req.body.priceRoom,
        statusRoom: req.body.statusRoom,
        description: req.body.description,
        wifi: req.body.wifi,
        parking: req.body.parking,
        receptionist: req.body.receptionist,
        gym: req.body.gym,
        roomMeeting: req.body.roomMeeting,
        laundry: req.body.laundry,
        pool: req.body.pool,
        restaurant: req.body.restaurant,
        elevator: req.body.elevator,
        wheelChairWay: req.body.wheelChairWay,
        shuttle: req.body.shuttle,
        other: req.body.other,
    }, function (error) {
        if (error) {
            res.send("Lỗi sửa thông tin");
        } else {
            room_model.findOne({ _id: req.params.id }, function (error, room) {
                if (error) {
                    res.send("Lỗi sửa thông tin" + error);
                } else {
                    // res.send("Sửa thông tin thành công");
                    // res.json(room);
                    // res.render('SuaPhong', {room: room});
                    res.redirect('/Categories');
                }
            })
        }
    });
});
// sua hoa don ssss
router.get('/sua_hoadon.id=:id', function (req, res, next) {
    // var room_model = db.model('room', room_schema);
    datPhong.findOne({ _id: req.params.id }, function (error, room) {
        if (error) {
            res.send("Lỗi sửa thông tin" + error);
        } else {
            res.render('SuaHoaDon', { room: room });
        }
    })
});
/// posrt sua sss
router.post('/sua_hoadon.id=:id', upload, function (req, res, next) {
    datPhong.findByIdAndUpdate(req.params.id, {
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
    }, function (error) {
        if (error) {
            res.send("Lỗi sửa thông tin");
        } else {
            datPhong.findOne({ _id: req.params.id }, function (error, room) {
                if (error) {
                    res.send("Lỗi sửa thông tin" + error);
                } else {
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

                data.push({ data: account[i], index: index });
                index++;
            }
            res.render('TaiKhoan', { account: data });
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
            dataSearch.push({ data: data[i], index: i });
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
    room_model.findOne({ _id: req.params.id }, function (error, room) {
        if (error) {
            res.send("Lỗi thêm thông tin" + error);
        } else {
            res.render('ThemHoaDon', { room: room });
        }
    })
});
// sửa hóa đơn

//
router.get('/ThongKe', function (req, res, next) {
    let listPhong = [];
    let Sum = 0;
    datPhong.find({}, function (err, datPhong) {
        if (err) {
            res.send('Lỗi lấy thông tin: ' + err.message);
        } else {
            var index = 0;
            datPhong.forEach((value) => {
                console.log(value.soDem);
                var doanhThu = value.soDem * value.giaPhong;
                Sum += Number(doanhThu)
                listPhong.push({ 'doanhThu': doanhThu, 'index': index, 'soNguoi': value.soNguoi });
                index++;
            });
            res.render('ThongKe', { thongKe: listPhong, tongdoanhThu: Sum })
        }
    })

});

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
    room_model.find({ statusRoom: 'Hết phòng' }).then((room) => {
        var dataSearch = [];
        for (var i = 0; i < room.length; i++) {
            dataSearch.push({ data: room[i], index: i });
        }
        res.render('PhongHet', {
            room: dataSearch
        })
    }

    )
})
    ;

router.get('/PhongTrong', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.find({ statusRoom: 'Còn phòng' }).then((room) => {
        var dataSearch = [];
        for (var i = 0; i < room.length; i++) {
            dataSearch.push({ data: room[i], index: i });
        }
        res.render('PhongTrong', {
            room: dataSearch
        })
    }
    )
});
router.get('/SapHetHan', function (req, res, next) {
    var listRoomExpired = [];
    datPhong.find({},).then((value) => {
        const dateNow = Date.now();
        for (var p of value) {
            var date = new Date(p.ngayTra).getTime();
            var dateExpired = date - dateNow;
            if (dateExpired < 0) {
                listRoomExpired.push(p)
            }
        }
        res.render('SapHetHan', { datPhong: listRoomExpired });
    });




});

router.use('/api', require('./api_router'))

// router().get('*', function (req, res) {
//     res.render('error')
// });


module.exports = router;


