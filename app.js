const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const path = require('path');

// Opción recomendada usando path
app.use(express.static(path.join(__dirname, '/public')));

const server = http.createServer(app);
const io = socketIo(server);

const os = require('os');

console.log("Nombre SO: " + os.platform());
console.log("Version SO" + os.release());
console.log("Arquitectura: " + os.arch());
console.log("Nombre Equipo: " + os.hostname());
console.log("==================================================================");

const PORT = process.env.PORT || 3500;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    console.log("==================================================================");
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Chat.html');
});
io.on('connection', (socket) => {
    console.log("usuario conectado");

    socket.on('disconnect', () => {
        console.log("usuario desconectado");
    });
    socket.on('MensajeEnviado', (msg) => {
        console.log('mensaje: ' + msg);
        io.emit('MensajeRecibido', msg);
    });
});