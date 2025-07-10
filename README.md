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

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/WarlenAA/chat-nodejs-socketio.git](https://github.com/WarlenAA/chat-nodejs-socketio.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd chat-nodejs-socketio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`. Para testar o chat, abra uma segunda janela (pode ser anônima) no mesmo endereço.

## 🔁 Enviando Atualizações (Workflow do Dia a Dia)

Após fazer alterações no código, o processo para enviá-las ao GitHub é um ciclo simples. Ele garante que seu trabalho seja salvo localmente antes de ser enviado para o repositório remoto.

**1. Adicione as Alterações**

Use o comando abaixo para adicionar todos os arquivos modificados à "área de preparação" (Staging Area). Isso prepara o Git para registrar um "snapshot" das suas mudanças.

```bash
git add .
```


**2. Crie um "Commit"**

O commit salva o "snapshot" das suas alterações no seu repositório local. É crucial escrever uma mensagem clara e descritiva sobre o que foi feito.

```bash
git commit -m "Descreva aqui a alteração feita, ex: 'Corrige bug na exibição do nome'"
```

**3. Envie para o GitHub**

Finalmente, o `push` envia todos os seus commits locais (que ainda não estão no repositório remoto) para o GitHub, atualizando o projeto para todos.

```bash
git push
```

**Resumo do Fluxo**

O ciclo básico que você usará 99% do tempo é:

`git add .` → `git commit -m "mensagem"` → `git push`

---

**✍️ Autor**

***Warlen Adriano Alves***

***GitHub: @WarlenAA***
    