let express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize=require('./util/database')
const morgan = require('morgan');

var port = process.env.PORT || 5000;


dotenv.config();


//////////////////////////////////////////////////////////


////////////////////////////////////////////////////////



let app = express();

//Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


//routes and logic


app.get("/", (req, res) => {
    res.send({ "name": "Vinay" });
});

sequelize.sync().then(result => {
    app.listen(port, () => {
        console.log("server started")
    })
}).catch(err=>console.log(err))