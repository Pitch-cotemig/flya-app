# Flya App

Sua parceira para viagem da sua vida.

## 🚀 Como rodar o projeto

### Opção 1: Rodar tudo junto (Recomendado)
```bash
npm run start
```
Este comando irá:
- Instalar todas as dependências (frontend e backend)
- Rodar o backend na porta 3000
- Rodar o frontend na porta 5173

### Opção 2: Rodar apenas o desenvolvimento
```bash
npm run dev:all
```
Este comando roda apenas o desenvolvimento (assume que as dependências já estão instaladas)

### Opção 3: Rodar separadamente

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
npm install
npm run dev
```

## 📁 Estrutura do projeto

```
flya-app/
├── backend/          # API NestJS
├── src/             # Frontend React
├── public/          # Arquivos estáticos
└── package.json     # Scripts do projeto
```

## 🛠️ Scripts disponíveis

- `npm run start` - Instala dependências e roda tudo
- `npm run dev:all` - Roda frontend e backend juntos
- `npm run dev:backend` - Roda apenas o backend
- `npm run dev:frontend` - Roda apenas o frontend
- `npm run install:all` - Instala dependências de frontend e backend
- `npm run build` - Build do frontend
- `npm run lint` - Lint do código

## 🌐 Portas

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 🔧 Tecnologias

**Frontend:**
- React + TypeScript
- Vite
- Styled Components
- React Router
- Redux Toolkit

**Backend:**
- NestJS
- TypeScript
- Supabase
