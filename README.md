# 💬 Chat em Tempo Real com Node.js e Socket.IO

Este é um projeto de um chat pessoal em tempo real, construído como parte de um estudo sobre tecnologias de comunicação web. A aplicação permite que dois usuários se conectem de forma anônima usando um ID único de 4 dígitos e conversem em uma sala privada.

## ✨ Funcionalidades Principais

- **Conexão Anônima:** Os usuários não precisam de cadastro. Ao abrir a aplicação, um ID único de 4 dígitos é gerado.
- **Nomes de Usuário (Opcional):** Os usuários podem definir um nome que será exibido para o parceiro de conversa.
- **Comunicação Unilateral:** Apenas um usuário precisa iniciar a conversa com o ID do outro. A conexão é estabelecida para ambos instantaneamente.
- **Lista de Conversas:** Uma barra lateral mostra todas as conversas ativas, permitindo alternar entre elas.
- **Atualização em Tempo Real:** Nomes de usuário e mensagens são atualizados instantaneamente para ambos os clientes usando WebSockets.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
- **Backend:**
  - [Node.js](https://nodejs.org/): Ambiente de execução para o JavaScript no servidor.
  - [Express.js](https://expressjs.com/): Framework para gerenciar o servidor e as rotas.
  - [Socket.IO](https://socket.io/): Biblioteca para habilitar a comunicação bidirecional e em tempo real baseada em eventos.
- **Desenvolvimento:**
  - [Nodemon](https://nodemon.io/): Ferramenta para reiniciar o servidor automaticamente durante o desenvolvimento.
  - [Git](https://git-scm.com/) & [GitHub](https://github.com/): Para versionamento e hospedagem do código.

## 🚀 Como Executar o Projeto Localmente

Para executar este projeto em sua máquina, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/WarlenAA/chat-nodejs-socketio.git](https://github.com/WarlenAA/chat-nodejs-socketio.git)

   