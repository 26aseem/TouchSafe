
//Express and Mongoose
require('dotenv').config();

const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

// ... other imports 
const path = require("path")

const adminauthRoutes = require('./routes/adminauth')
const adminRoutes = require('./routes/admin')
const merchantRoutes = require('./routes/merchant')
const categoryRoutes = require('./routes/category')
const foodRoutes = require('./routes/food')
const orderRoutes = require('./routes/order')
const stripeRoutes = require('./routes/stripepayment')

const mongoose = require('mongoose');

//Database connection is established
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then((c) => {
    console.log("DATABASE CONNECTED")
    
});

//Middlewares
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // restrict calls to those this address
    methods: "GET, PUT, POST, DELETE,OPTIONS" 
}));

//CORS middleware
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, X-Requested-With, Accept,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
 
    next();
}

app.use(corsMiddleware);

app.set('host', "*.*.*.*"); 


//My Routes
///api is added before all 
app.use("/api",adminauthRoutes);
app.use("/api",adminRoutes);
app.use("/api",merchantRoutes);
app.use("/api",categoryRoutes);
app.use("/api",foodRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);

//Port for listening
const port = process.env.PORT || 8000;

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//Starting a server
app.listen(port, () => {
    console.log(`WebApp is running... at ${port}`)
});



