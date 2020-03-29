const Event = require('events').EventEmitter;
const event = new Event();

event.on('transferData', (a,b,c) => {
  console.log('接收到数据---> ', a,b,c);
});
setTimeout(() => {
  event.emit('transferData', 1,2,3)
}, 3000);