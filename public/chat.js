$(function() {
    var socket = io.connect('http://localhost:3000', {secure: true})

    var message = $("#message")
    var username = $("#username")
    var send_message = $("#input_zone")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")

    send_message.on('submit', function(e) {
        socket.emit('new_message', {message : message.val()})
        e.preventDefault();
    })

    socket.on("new_message", (data) => {
        console.log(data)
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    send_username.click(function() {
        console.log(username.val())
        socket.emit('change_name', {username : username.val()})
    })
});