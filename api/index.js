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


// app.use((req, res, next) => {
//     // console.log(req.headers);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', "*");
    
//     next();
// })

// nginx configuration
// proxy_set_header X-Real-IP $remote_addr;
// proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// proxy_set_header Host $host;
// proxy_set_header X-NginX-Proxy true;
// proxy_pass http://localhost:5050/;
// proxy_http_version 1.1;
// proxy_set_header Upgrade $http_upgrade;
// proxy_set_header Connection "upgrade";



























