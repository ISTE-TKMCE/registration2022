let express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require('./util/database')
const morgan = require('morgan');
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const User = require("./models/models").User
var port = process.env.PORT || 5000;


dotenv.config();


//////////////////////////////////////////////////////////


////////////////////////////////////////////////////////



let app = express();

//Middlewares
const publicdrc = path.resolve(__dirname, 'public')
app.use(express.static(publicdrc))
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/screenshots')
    },
    filename: (req, file, cb) => {

        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const upload = multer({ storage });
//routes and logic

app.put("/user", upload.single('file'), async (req, res) => {
    try {
        const data = await JSON.parse(req.body.data)
        const user = await User.findOne({ email: req.body.email }).then(response => { if (response) { return true } else { return false } }).catch(err => { return false })
        if (user) {
            return res.send({ status: 403, message: "Email already registered" })
        }
        else {
            User.create({
                name: data.name,
                email: data.email,
                phonenumber: data.phonenumber,
                dob: data.dob,
                branch: data.branch,
                batch: data.batch,
                year: data.year,
                admissionyear: data.admissionyear,
                admissionnumber: data.admissionnumber,
                address: data.address,
                specialinterests: data.specialinterests,
                careerpreference: data.careerpreference,
                typeofservice: data.typeofservice,
                accholdersname: data.accholdersname,
                transactionid: data.transactionid,
                imageurl: new Date().toISOString().replace(/:/g, '-') + '-' + req.file.originalname
            }).then(response => {
                console.log(response)
                res.send({ status: 200, message: "User created successfully" })
            }).catch(err => {
                console.log(err)
                res.send({ status: 400, message: "Couldn't register user" })
            })
        }
    }
    catch (err) {
        console.log(err)
        res.send({ status: 400, message: "Couldn't register user" })
    }
})
app.get("/", (req, res) => {
    res.render("homepage");
});

sequelize.sync().then(result => {
    app.listen(port, () => {
        console.log("server started")
    })
}).catch(err => console.log(err))