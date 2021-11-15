var express = require('express');
var router = express.Router();

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
    roomNumber: Number,
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
});
router.get('/addAccount', function (req, res) {
    res.send("aa")
});
//

//
router.post('/addAccount', createUser);


function createUser(req, res) {
    var account = db.model('account', account_schema);
    console.log({
        gmail: req.body.gmail,
        password: req.body.password,
    })

    return account({
        gmail: req.body.gmail,
        password: req.body.password,
    })
        .save()
        .then((newUser) => {
            return res.status(201).json({
                success: true,
                message: 'New user created successfully',
                gmail: newUser.gmail,
                password: newUser.password,

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
    res.render('index',);
});

//Man hinh home
// router.get('/Categories', function(req, res, next) {
//   res.render('Categories', );
// });

//Danh sach phong - chua hoat dong duoc
router.get('/Categories', function (req, res, next) {
    var room_model = db.model('room', room_schema);
    room_model.find({}, function (error, roomlist) {
        if (error) {
            res.send('Lỗi lấy thông tin: ' + error.message);
        } else {
            res.render('Categories', {room: roomlist});
        }
    })
});
//Dat phong
router.get('/DatPhong', function (req, res, next) {
    res.render('DatPhong',);
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
            room_model.findOne({_id: req.params.id}, function (error, room) {
                if (error) {
                    res.send("Lỗi sửa thông tin" + error);
                } else {
                    res.send("Sửa thông tin thành công");
                    res.json(room);
                    res.render('Categories', {room: room});
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
        if (error) {
            res.send("Lỗi sửa thông tin" + error);
            console.log("looo" + account.toString());
        } else {
            res.render('TaiKhoan', {account: account});
        }
    })
});

router.get('/ThongKe', function (req, res, next) {
    res.render('ThongKe',);
});

router.get('/ThemHoaDon', function (req, res, next) {
    res.render('ThemHoaDon',);
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
    res.render('HetHanTrongNgay',);
});

router.get('/PhongTrong', function (req, res, next) {
    res.render('PhongTrong',);
});

router.get('/SapHetHan', function (req, res, next) {
    res.render('SapHetHan',);
});
module.exports = router;
