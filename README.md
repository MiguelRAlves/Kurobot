# 🤖 Kurobot

O **Kurobot** é um chatbot full-stack moderno que utiliza a inteligência artificial do Google Gemini para processar mensagens. O projeto foi construído focando em segurança (chave de API protegida no backend), persistência de contexto (histórico de conversa) e uma interface responsiva.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** (v19) com **TypeScript**
- **Vite** (Build tool ultra-rápida)
- **Tailwind CSS v4** (Estilização moderna)
- **React Markdown** (Suporte a textos formatados, tabelas e códigos)

### Backend
- **Node.js** com **Express**
- **TypeScript** (Executado via `tsx`)
- **Google Generative AI SDK** (Integração com Gemini 2.5 Flash)
- **Dotenv** (Gerenciamento de variáveis de ambiente)

---

## 📦 Estrutura do Projeto

```text
Kurobot/
├── chat/            # Frontend (ReactTS + TailwindCSS)
└── gemini-server/   # Backend (Express + Gemini API)
```

---

## 🛠️ Como rodar o projeto localmente

### 1. Pré-requisitos
- **Node.js** instalado.
- Uma **API Key** do [Google AI Studio](https://aistudio.google.com/).

### 2. Configurando o Backend
Entre na pasta do servidor:
```bash
cd gemini-server
npm install
```
Crie um arquivo .env dentro da pasta gemini-server:

```
GEMINI_API_KEY=SUA_CHAVE_AQUI
PORT=3001
```
Inicie o servidor:
```bash
npm run dev
```
### 3. Configurando o Frontend

Abra um novo terminal na pasta raiz e entre na pasta do chat:
```bash
cd chat
npm install
npm run dev
```
Acesse http://localhost:5173 no seu navegador.

## 💡 Funcionalidades Implementadas
- Contexto de Conversa: A IA lembra o que foi dito anteriormente durante a sessão.

- Segurança: Chave de API protegida por um servidor intermediário.

- Markdown: Suporte completo para renderizar negritos, listas e blocos de código.

- Scroll Automático: A janela de chat desce sozinha ao receber novas mensagens.

- Indicador de Digitação: Feedback visual enquanto o Kurobot processa a resposta.

## 📄 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar e estudar!

### Feito com ❤️ por MiguelRAlves