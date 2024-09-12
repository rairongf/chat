### 🚧 Em construção 

# chat

Sistema de chat em tempo real utilizando TypeScript tanto no front-end quanto no back-end.

## 🛠 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Nest.js](https://docs.nestjs.com/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Socket.IO](https://socket.io/docs/v4/)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

## 🚀 Como executar o projeto
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

<p>
  <a style="text-decoration: none" href="https://git-scm.com" target="_blank">Git</a>,
  <a style="text-decoration: none" href="https://nodejs.org/en/" target="_blank">Node.js</a>.
</p>

Além disto é bom ter um editor para trabalhar com o código como o <a style="text-decoration: none" href="https://code.visualstudio.com/" target="_blank">VSCode</a>.

### Clone o projeto
```bash
# Clone este repositório
$ git clone https://github.com/rairongf/chat.git

# Acesse a pasta do projeto no terminal/cmd
$ cd chat
```

### 🌐 Rodando o Back End (servidor)

Crie o arquivo `.env.development.local` no diretório raiz do projeto (`/api/.env.development.local`)
com o conteúdo abaixo:

```env
MONGO_URI=mongodb+srv://admin:admin@chat-app-dev.ztsiw.mongodb.net/?retryWrites=true&w=majority&appName=chat-app-dev
PORT=3008
NODE_ENV=development
```

Depois, siga as instruções abaixo:

```bash
# Acesse o diretório raiz da aplicação
cd api

# Instale as dependências
npm i

# Execute a aplicação em modo desenvolvimento
npm run start:dev
```

### 💻 Rodando a aplicação web (Front End)

Crie o arquivo `.env.development.local` no diretório raiz do projeto (`/frontend/.env.development.local`)
com o conteúdo abaixo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3008
```

Depois, siga as instruções abaixo utilizando um 🚨 terminal diferente:

```bash
# Acesse o diretório raiz da aplicação
# Se estiver no diretório do backend, execute `cd ..` antes
cd frontend

# Instale as dependências
npm i

# Execute a aplicação em modo desenvolvimento
npm run dev
```

### Como testar a comunicação em tempo real

Existem três contas disponíveis para testes no momento:

#### Conta 1 (e-mail e senha)
- rairon.ferreira@email.com
- 123456

#### Conta 2 (e-mail e senha)
- noriar.goncalves@email.com
- 123456

#### Conta 3 (e-mail e senha)
- user3@email.com
- 123456

Acessando as três contas simultaneamente, é possível visualizar **até dois canais de conversa disponíveis**.

> Abra o Console do navegador para acompanhar as mensagens.

Ao tocar em um canal:
1. uma conexão via WebSocket é estabelecida;
2. uma caixa para entrada de texto surje na parte superior.

Ao preencher o campo e enviar uma mensagem:
1. o usuário autenticado envia uma mensagem ao canal via WebSocket;
2. todos os usuários conectados neste mesmo canal receberão a mensagem (🚨 acompanhe pelo Console do navegador).

### Autor

<a href="https://www.linkedin.com/in/raironferreira/">
 <img
    style="border-radius: 50%;"
    src="https://avatars.githubusercontent.com/u/43035850?v=4"
    width="100px;"
    alt=""/>
 <br />
 <sub><b>Rairon Ferreira</b></sub></a>


Feito com ❤️ por Rairon Ferreira 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Rairon_Ferreira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/raironferreira/)](https://www.linkedin.com/in/raironferreira/) 
[![Gmail Badge](https://img.shields.io/badge/-rairon.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rairon.dev@gmail.com)](mailto:rairon.dev@gmail.com)