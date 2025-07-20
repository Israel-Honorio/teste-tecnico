# 🚀 Project Stefanini

![Full Stack](https://img.shields.io/badge/Full%20Stack-Next.js%20%2B%20NestJS-blue)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-informational)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind-06B6D4)

Aplicação **Full Stack** utilizando:

- **Backend**: NestJS + Prisma + PostgreSQL  
- **Frontend**: Next.js + Tailwind CSS + Axios  
- **Banco de Dados**: PostgreSQL local

## ⚙️ Pré-requisitos

- Node.js
- PostgreSQL instalado
- Yarn ou NPM

## 🚀 Começando

### 1. Configuração do Banco de Dados

```sql
CREATE DATABASE stefanini_db;
```
Ou crie através do pgadmin4 um banco de dados chamado stefanini_db;

Configure a conexão no arquivo .env do backend:
```
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/stefanini_db?schema=public"
                        // aqui é necessário colocar a senha do seu pgadmin
PORT=3001
```


### 🖥️ 2. Instalando dependências
#### ➡️ Backend
entre na pasta backend
digite os seguintes comandos:
```
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm run start:dev
```
O backend estará rodando em:
- http://localhost:3001/api
- http://localhost:3001/api/membros
- http://localhost:3001/api/posts

#### ➡️ Frontend
Abra outro terminal, entre na pasta frontend e digite os seguintes comandos:
```
cd frontend
npm install
npm run dev
```

O frontend estará rodando em:
- http://localhost:3000
- http://localhost:3000/membros
- http://localhost:3000/posts


#### 🌐 Endpoints:

Membros
- GET /api/membros - Lista todos os membros
- POST /api/membros - Cria novo membro
- PATCH /api/membros/:id - Atualiza membro
- DELETE /api/membros/:id - Remove membro

Posts
- GET /api/posts - Lista todos os posts
- POST /api/posts - Cria novo post
- PATCH /api/posts/:id - Atualiza post
- DELETE /api/posts/:id - Remove post

## 👤 Autor:
- Israel Honório de Castro
- github: Israel-Honorio
- https://github.com/Israel-Honorio
