var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: "jeb@qq.com",
    //     text: 'Hey this is Harry.'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnect from server');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});