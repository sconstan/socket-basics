//var name = getQueryVariable('name');
//var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
	// console.log('In room: ' + room + ' as user: ' + name);
});

socket.on('message', function(message) {
	// var momentTimestamp;

	var timestampMoment = moment.utc(message.timestamp);
	var timestampText = timestampMoment.local().format('h:mm:ss a');

	console.log('New message:');
	console.log(message.text);
	console.log(timestampText);

	jQuery('.messages').append('<p><strong>' + timestampText + '</strong>: ' + message.text + '</p>');

});

// handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');

});