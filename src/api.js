import openSocket from 'socket.io-client';
export const socket = openSocket(
    process.env.NODE_ENV === "production" ?
    'https://sockets-with-react.herokuapp.com' :
    'http://localhost:8000'
    );

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer }