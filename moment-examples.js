var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));
// console.log(now.valueOf());

var timestamp = console.log(now.valueOf());

var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a'));