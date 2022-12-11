/**
 * Title: app file
 */

// external import

const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

/*
 internal imports 
 */

 // error middlerware
 const { defaultErrorHandler, notFoundHandler } = require('./middleware/common/errorHandler');

 // apps routes
 const userRoutes = require('./routers/userRoutes');
 const gameRoutes = require('./routers/gameRoutes');
 const productRoutes = require("./routers/productRoutes");
 const loginRoutes = require('./routers/loginRoutes');
 const messangerRoutes = require("./routers/messengerRoutes");
 const configRoutes = require("./routers/configRoutes");
 const announcementRoutes = require("./routers/announcementRoutes");
 const orderRoutes = require("./routers/orderRoutes");

// database connection function
const connectDatabase = require("./config/database");

// create connection to database
connectDatabase();

// initialize express app 
const app = express();



app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', "*");
    
    next();
})


// setting api configuration
app.use(express.json());

// multipart form data

app.use(express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
        res.set('Access-Control-Allow-Origin', "*")
    }
}));


// unsiged cookie
app.use(cookieParser());


// request logger
app.use((req, res, next) => {
    next();
});

/**
 * apps router
 */

// login routes
app.use("/", loginRoutes);

// user router
app.use("/user", userRoutes);

// product router
app.use('/game', gameRoutes);

// productList router
app.use('/product', productRoutes);

// messanger routes
app.use('/messenger', messangerRoutes);

// order routes
app.use('/order', orderRoutes);

// config routes
app.use('/config', configRoutes);

// announcement routes
app.use("/announcement", announcementRoutes);

// 404 error handling routes
app.use(notFoundHandler);

// default error handler routes
app.use(defaultErrorHandler);



// export apps
module.exports = app;
