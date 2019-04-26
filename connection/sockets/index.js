const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log(`a user is connected: ${client.id}`);
    
    client.on('subscribeToTimer', interval => {
        console.log('client is subscribing to timer with interval', interval);

        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('disconnect', function(){
        console.log(`user disconnected ${client.id}`);
    });

    client.on('chat message', msg => {
        console.log(`${client.id}:`, msg);
        io.emit('chat message', `${client.id}: ${msg}`);
    });
});

server.listen(8000, () => {
    console.log('listening on port 8000');
});