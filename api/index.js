/**
 * request entry file
 */

// external import
const http = require("http");
const dotenv = require("dotenv");
const {Server} = require("socket.io");


// getting environtment variable
dotenv.config();

// getting port from env variable
const PORT = process.env.PORT ? process.env.PORT : 5000;


// initialize express app 
const app = require("./app");



// creating http server
const httpServer = http.createServer(app);


// bind socket.io with http server
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: "*"
    },
    concurrencyLimit: 50
});

// seting global io soket instance
global.io = io;


// start http server
httpServer.listen(PORT, (err) => {
    if(!err) {
        console.log(`Server running on port ${PORT}`);
    } else {
        console.log("Erro to start http server");s
    }
});

























