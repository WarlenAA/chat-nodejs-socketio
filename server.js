const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Mapa para armazenar os usuários: { userId -> { socketId: '...', name: '...' } }
const users = new Map();

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Função para gerar um ID único de 4 dígitos
function generateUniqueId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newId;
    do {
        newId = '';
        for (let i = 0; i < 4; i++) {
            newId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (users.has(newId)); // Garante que o ID não exista antes de retornar
    return newId;
}

// Lógica de conexão do Socket.IO
io.on('connection', (socket) => {
    const userId = generateUniqueId();
    users.set(userId, { socketId: socket.id, name: null });
    console.log(`ID ${userId} gerado para o novo usuário.`);

    socket.emit('your-id', userId);

    socket.on('set-name', ({ name }) => {
        const userData = users.get(userId);
        if (userData) {
            userData.name = name;
            console.log(`Usuário ${userId} definiu o nome para: ${name}`);
            
            // Notifica todos os outros clientes sobre a atualização do nome
            socket.broadcast.emit('name-updated', {
                userId: userId,
                newName: name
            });
        }
    });

    socket.on('initiate-chat', ({ recipientId }) => {
        const recipientData = users.get(recipientId);
        const senderData = users.get(userId);

        if (!recipientData || !senderData) {
            socket.emit('user-not-found', recipientId);
            return;
        }

        // Envia para o destinatário as informações do remetente
        io.to(recipientData.socketId).emit('chat-started', {
            partnerId: userId,
            partnerName: senderData.name
        });

        // Envia para o remetente as informações do destinatário
        socket.emit('chat-started', {
            partnerId: recipientId,
            partnerName: recipientData.name
        });
    });

    socket.on('send-private-message', ({ recipientId, message }) => {
        const recipientData = users.get(recipientId);
        if (recipientData) {
            io.to(recipientData.socketId).emit('receive-private-message', {
                message,
                senderId: userId
            });
            socket.emit('receive-private-message', {
                message,
                senderId: userId
            });
        }
    });

    socket.on('disconnect', () => {
        users.delete(userId);
        console.log(`Usuário ${userId} desconectou. Usuários restantes: ${users.size}`);
        // Notifica todos que este usuário ficou offline
        socket.broadcast.emit('user-disconnected', { userId });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Use "npm run dev" para iniciar.');
});

