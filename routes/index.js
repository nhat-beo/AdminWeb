const express = require('express');
const router = express.Router();

//Multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
});

const upload = multer({
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
const bodyParser = require('body-parser');
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// getting-started.js
const mongoose = require('mongoose');
const {float} = require("tailwindcss/lib/plugins");
mongoose.connect('mongodb+srv://admin:minhminh@cluster0.hiqs0.mongodb.net/bFpolyHotel?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Succesfully rồi thằng ngu ạ');
});

// Định nghĩa 1 collection trong schema
const room_schema = new mongoose.Schema({
  roomPhoto: Array,
  roomNumber: Number,
  typeRoom: String,
  rankRoom: String,
  peopleRoom: String,
  priceRoom: Number,
  statusRoom: String,
  description: String,
  wifi: String,
  parking: String,
  receptionist: String,
  gym: String,
  roomMeeting: String,
  laundry: String,
  pool: String,
  restaurant: String,
  elevator: String,
  wheelChairWay: String,
  shuttle: String,
  other: String,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', );
});

//Man hinh home
router.get('/Categories', function(req, res, next) {
  res.render('Categories', );
});

//Dat phong
router.get('/DatPhong', function(req, res, next) {
  res.render('DatPhong', );
});

router.post('/add_room', upload, function(req, res, next) {
  const room_model = db.model('room', room_schema);
  room_model({
    roomPhoto: req.files,
    roomNumber : req.body.roomNumber,
    typeRoom : req.body.typeRoom,
    rankRoom : req.body.rankRoom,
    peopleRoom : req.body.peopleRoom,
    priceRoom : req.body.priceRoom,
    statusRoom : req.body.statusRoom,
    description : req.body.description,
    wifi : req.body.wifi,
    parking : req.body.parking,
    receptionist : req.body.receptionist,
    gym : req.body.gym,
    roomMeeting : req.body.roomMeeting,
    laundry : req.body.laundry,
    pool : req.body.pool,
    restaurant : req.body.restaurant,
    elevator : req.body.elevator,
    wheelChairWay : req.body.wheelChairWay,
    shuttle : req.body.shuttle,
    other : req.body.other,
  }).save(function (error){
    if (error) {
      res.send("Lỗi thêm thông tin");
    } else {
      res.redirect("/Categories");
    }
  });
});

router.get('/DoiMatKhau', function(req, res, next) {
  res.render('DoiMatKhau', );
});

router.get('/TaiKhoan', function(req, res, next) {
  res.render('TaiKhoan', );
});

router.get('/ThongKe', function(req, res, next) {
  res.render('ThongKe', );
});

router.get('/ThemHoaDon', function(req, res, next) {
  res.render('ThemHoaDon', );
});

router.get('/SuaHoaDon', function(req, res, next) {
  res.render('SuaHoaDon', );
});

router.get('/ThemPhong', function(req, res, next) {
  res.render('ThemPhong', );
});

router.get('/SuaPhong', function(req, res, next) {
  res.render('SuaPhong', );
});

router.get('/HetHanTrongNgay', function(req, res, next) {
  res.render('HetHanTrongNgay', );
});

router.get('/PhongTrong', function(req, res, next) {
  res.render('PhongTrong', );
});

router.get('/SapHetHan', function(req, res, next) {
  res.render('SapHetHan', );
});
module.exports = router;
