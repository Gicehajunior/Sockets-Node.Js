// clear the inputs
process.stdout.write('\u001B[2J\u001B[0;0f');

// require the net module and create a server
const server = require('net').createServer();
let counter = 0;
let sockets = {};

// connection handler @ an every time a client server is connected
server.on('connection', socket => {
    socket.id = counter++;
    sockets[socket.id] = socket;

    console.log('Client is connected');
    socket.write('Please write your name below!');

    socket.on('data', data => {
        if (!sockets[socket.id]){
            socket.name = data.toString.trim();
            socket.write(`Welcome ${socket.name}\n`);
            sockets[socket.id] = socket;
            return;
        }
        Object.entries(sockets).forEach(([key, client_socket]) => {
            if (socket.id == key ) return;
            client_socket.write(`${socket.id}:`);
            client_socket.write(data);
        });
    });

    // emit a message to the master server for any client disconnection 
    socket.on('end', () => {
        delete sockets[socket.id]
        console.log("The Client is disconnected");
    });
    
    // encoding type/method to be used globally
    socket.setEncoding("utf-8");
});


// listen to port
server.listen(5500, () => {
    console.log('Server is active');
});
