document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // --- Elementos da UI ---
    const myIdSpan = document.getElementById('my-id');
    const copyIdBtn = document.getElementById('copy-id-btn');
    const nameInput = document.getElementById('name-input');
    const setNameBtn = document.getElementById('set-name-btn');
    const recipientIdInput = document.getElementById('recipient-id-input');
    const connectBtn = document.getElementById('connect-btn');
    const chatsList = document.getElementById('chats-list');
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const chatWindow = document.getElementById('chat-window');
    const chatWithIdSpan = document.getElementById('chat-with-id');
    const messagesContainer = document.getElementById('messages-container');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    // --- Estado do Cliente (Fonte da Verdade) ---
    let myId = '';
    let currentChat = null; // ID do parceiro da conversa ativa
    const messageHistory = {}; // { 'partnerId': [messages] }
    const userInfoCache = {}; // { 'userId': { displayName: 'Name' } }

    // --- Funções de Renderização (usam o estado acima) ---
    const renderChatsList = () => {
        chatsList.innerHTML = '';
        const partners = Object.keys(messageHistory);
        partners.forEach(partnerId => {
            const li = document.createElement('li');
            const displayName = userInfoCache[partnerId]?.displayName || partnerId;
            li.textContent = displayName;
            li.dataset.partnerId = partnerId;
            if (partnerId === currentChat) {
                li.classList.add('active');
            }
            chatsList.appendChild(li);
        });
    };

    const renderChatWindow = (partnerId) => {
        currentChat = partnerId;
        const displayName = userInfoCache[partnerId]?.displayName || partnerId;
        chatWithIdSpan.textContent = displayName;
        messagesContainer.innerHTML = '';

        const history = messageHistory[partnerId] || [];
        history.forEach(msg => displayMessage(msg));

        welcomeScreen.classList.remove('active');
        chatWindow.classList.add('active');
        renderChatsList();
    };
    
    const displayMessage = (msg) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = msg.message;
        messageElement.classList.add(msg.senderId === myId ? 'sent' : 'received');
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // --- Lógica de Eventos do Usuário ---
    copyIdBtn.addEventListener('click', () => navigator.clipboard.writeText(myId).then(() => alert('ID copiado!')));
    
    setNameBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            socket.emit('set-name', { name });
            if (!userInfoCache[myId]) userInfoCache[myId] = {};
            userInfoCache[myId].displayName = name; // Atualiza o cache local imediatamente
            alert(`Nome definido como: ${name}`);
        }
    });

    connectBtn.addEventListener('click', () => {
        const recipientId = recipientIdInput.value.trim();
        if (recipientId && recipientId !== myId) {
            socket.emit('initiate-chat', { recipientId });
            recipientIdInput.value = '';
        } else {
            alert('Por favor, insira um ID válido e diferente do seu.');
        }
    });

    chatsList.addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === 'LI') {
            renderChatWindow(e.target.dataset.partnerId);
        }
    });

    const sendMessage = () => {
        const message = messageInput.value.trim();
        if (message && currentChat) {
            socket.emit('send-private-message', { recipientId: currentChat, message });
            messageInput.value = '';
        }
    };
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // --- Listeners de Eventos do Socket ---
    socket.on('your-id', (id) => {
        myId = id;
        myIdSpan.textContent = myId;
    });

    socket.on('chat-started', ({ partnerId, partnerName }) => {
        // Atualiza o cache com a informação mais recente do parceiro
        if (!userInfoCache[partnerId]) userInfoCache[partnerId] = {};
        userInfoCache[partnerId].displayName = partnerName || partnerId;

        // Inicia o histórico de mensagens se for uma nova conversa
        if (!messageHistory[partnerId]) {
            messageHistory[partnerId] = [];
        }

        renderChatWindow(partnerId); // Abre a janela de chat com o parceiro
    });

    socket.on('name-updated', ({ userId, newName }) => {
        if (userInfoCache[userId]) {
            userInfoCache[userId].displayName = newName || userId;
            renderChatsList(); // Atualiza a lista da lateral
            if (currentChat === userId) {
                chatWithIdSpan.textContent = newName || userId; // Atualiza o cabeçalho do chat ativo
            }
        }
    });

    socket.on('receive-private-message', (msg) => {
        const partnerId = msg.senderId === myId ? currentChat : msg.senderId;
        if (!messageHistory[partnerId]) messageHistory[partnerId] = [];
        
        messageHistory[partnerId].push(msg);

        if (partnerId === currentChat) {
            displayMessage(msg);
        } else {
            // Futuramente: Adicionar um indicador de nova mensagem
        }
    });

    socket.on('user-disconnected', ({ userId }) => {
        if (userInfoCache[userId]) {
            userInfoCache[userId].displayName = `${userInfoCache[userId].displayName || userId} (Offline)`;
            renderChatsList();
            if (currentChat === userId) {
                chatWithIdSpan.textContent = userInfoCache[userId].displayName;
            }
        }
    });
    
    socket.on('user-not-found', (recipientId) => {
        alert(`Usuário ${recipientId} não foi encontrado ou está offline.`);
    });
});

