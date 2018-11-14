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

// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it', data);
// });

socket.on('newLocationMessage', message => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function () {
        
    })
});

var lcoationButton = jQuery('#send-location');
lcoationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your broswer.')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    })
});