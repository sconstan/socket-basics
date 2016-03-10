var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Default';
var socket = io();

console.log(name + ' wants to join ' + room);


// update H1 tag 
$(".room-title").text(name + ' in room ' + room);

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});

});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' said at ' + momentTimestamp.local().format('h:mm:ss a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');

	$messages.append($message);

});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});