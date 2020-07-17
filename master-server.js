// clear the inputs
process.stdout.write('\u001B[2J\u001B[0;0f');

// require the net module and create a server
const server = require('net').createServer();

// connection handler @ an every time a client server is connected
server.on('connection', socket => {
    console.log('Client is connected');
    socket.write('Welcome new Client!\n');

    socket.on('data', data => {
        console.log('Data Sent is:', data);
        socket.write('data is:');
        socket.write(data);
    });

    // emit a message to the master server for any client disconnection 
    socket.on('end', () => {
        console.log("The Client is disconnected");
    });
    
    // encoding type/method to be used globally
    socket.setEncoding("utf-8");
});


// listen to port
server.listen(5500, () => {
    console.log('Server is active');
});
