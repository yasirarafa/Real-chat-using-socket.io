const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const path = require('path');
const publicPath = path.join(__dirname, '/public');


let app = express();
app.use(express.static(publicPath));
let server = http.createServer(app);
let io = socketIO(server);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log("A new user just connected");

socket.on('disconnect', () => {
    console.log('A user is disconnected');
    });    
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});