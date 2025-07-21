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

Configure a conexão no arquivo .env do backend (crie um arquivo .env):
```
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/stefanini_db?schema=public"
                        // aqui é necessário colocar a senha do seu pgadmin
PORT=3001

coloque esse código sql na query tools do banco de dados no pgadmin4:

INSERT INTO membros (id, nome, email, profissao, created_at, updated_at)
VALUES
  (1, 'João Silva', 'joao.silva@example.com', 'Engenheiro de Software', now(), now()),
  (2, 'Maria Souza', 'maria.souza@example.com', 'Desenvolvedora Fullstack', now(), now()),
  (3, 'Carlos Lima', 'carlos.lima@example.com', 'Analista de Dados', now(), now()),
  (4, 'Ana Costa', 'ana.costa@example.com', 'Product Owner', now(), now()),
  (5, 'Bruno Rocha', 'bruno.rocha@example.com', 'UX Designer', now(), now()),
  (6, 'neymar', 'neymar@gmail.com', 'Jogador', now(), now());

INSERT INTO posts (titulo, texto, "autorId")
VALUES
  ('Introdução ao NestJS', 'Conteúdo sobre introdução ao NestJS', 2),
  ('Criando APIs com Prisma', 'Exemplo prático de Prisma ORM', 5),
  ('Análise de dados com SQL', 'SQL avançado para Data Science', 4),
  ('Gerenciamento de Produto', 'Boas práticas para Product Owners', 2),
  ('Design de interfaces intuitivas', 'Principais heurísticas de UX', 1),
  ('Avançando no TypeScript', 'Generics, Utility Types e beyond', 3),
  ('Deploy de aplicações Node.js', 'Como realizar deploy na AWS', 5),
  ('Testes automatizados com Jest', 'Cobertura e mocks avançados', 1),
  ('Visualizações com PowerBI', 'Criando dashboards eficientes', 3),
  ('Agilidade em projetos', 'Scrum, Kanban e além', 4);
  ('Meus Títulos', 'Tenho uma champions league e uma copa Libertadores', 6)


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
