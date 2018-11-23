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
    var formattedTime = moment(message.createAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it', data);
// });

socket.on('newLocationMessage', message => {
    var formattedTime = moment(message.createAt).format('h:mm a')
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'user',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    })
});

var lcoationButton = jQuery('#send-location');
lcoationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your broswer.')
    }

    lcoationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        lcoationButton.removeAttr('disabled').text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        lcoationButton.removeAttr('disabled').text('Sending location');
        alert('Unable to fetch location.');
    })
});