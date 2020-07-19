const dgram = require('dgram');
const PORT = 5500;
const HOST = '127.0.0.1';

// create server
const server = dgram.createSocket('udp4');

server.on('listening', ()=>{
    console.log('The UDP server is active!');
});

server.on('message', (msg, rinfo)=>{
    console.log(`${rinfo.address}, ${rinfo.port}, ${msg}`);
});

// bind the connection to a port/server address
server.bind(PORT, HOST);

const client = dgram.createSocket('udp4');

client.send('Giceha Junior is a handsome man', PORT, HOST, (err) => {
    if (err) throw err;

    console.log('UDP message sent');
    client.close();
});



