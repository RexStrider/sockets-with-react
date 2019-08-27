
module.exports = server => {

    // temporary value for socket io, we set this after determing if we are in production or development environment
    let temp;

    if (process.env.NODE_ENV === "production") {
        temp = require('socket.io').listen(server)
    } else {
        const app = require('express')();
        const server = require('http').createServer(app);
        temp = require('socket.io')(server);
    }

    // make sure io is a constant and can't be changed after determing the environment
    const io = temp;

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

    // if we are **NOT** in production
    if (process.env.NODE_ENV !== "production") {
        server.listen(8000, () => {
            console.log('listening on port 8000');
        });
    }

}