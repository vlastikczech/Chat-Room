const express = require('express');
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

server = app.listen(process.env.PORT || 3000);

const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.username = "Anonymous";

    socket.on('change_name', (data) => {
        socket.username = data.username
    })

    socket.on('new_message', (data) => {
        socket.emit('new_message', {message : data.message, username: socket.username})
    })
})