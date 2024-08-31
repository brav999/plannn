# Task Manager

![GitHub repo size](https://img.shields.io/github/repo-size/brav999/plannn?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/brav999/plannn?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/brav999/plannn?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/brav999/plannn?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/brav999/plannn?style=for-the-badge)

Este é um projeto de API para gerenciamento de tarefas, desenvolvido utilizando Node.js, Express e MongoDB. A API permite a criação, leitura, atualização e exclusão (CRUD) de tarefas. O projeto segue uma arquitetura organizada em controladores, rotas, modelos e serviços.

## Estrutura do Projeto

```
src/
│
├── config/
│ └── db.js # Configuração da conexão com o banco de dados MongoDB
│
├── controllers/
│ └── taskController.js # Controladores para gerenciar as operações de tarefas
│
├── middleware/
│ └── authMiddleware.js # Middleware para autenticação (a ser implementado)
│
├── models/
│ └── taskModel.js # Definição do modelo de dados das tarefas
│
├── routes/
│ └── taskRoutes.js # Definição das rotas para as operações de tarefas
│
├── services/
│ └── taskServices.js # Lógica de negócios para gerenciamento de tarefas (a ser implementado)
│
├── app.js # Configuração da aplicação Express
└── server.js # Inicialização do servidor e conexão com o banco de dados
```

## Funcionalidades

- **Autenticação (a ser implementada):** Proteger as rotas com JWT para garantir que apenas usuários autenticados possam acessar e modificar as tarefas.
- **CRUD de Tarefas:**
  - **GET /api/tasks:** Obter a lista de todas as tarefas.
  - **POST /api/tasks:** Criar uma nova tarefa.
  - **PUT /api/tasks/:id (a ser implementado):** Atualizar uma tarefa existente.
  - **DELETE /api/tasks/:id (a ser implementado):** Excluir uma tarefa existente.

## Pré-requisitos

- Node.js v12 ou superior
- MongoDB
- NPM ou Yarn

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/brav999/plannn.git
   cd plannn
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

## Melhorias Futuras

- Implementação de autenticação JWT.
- Adicionar rotas para atualização e exclusão de tarefas.
- Validação avançada de entrada de dados usando bibliotecas como `Joi` ou `express-validator`.
- Implementar paginação e filtros para a listagem de tarefas.
- Adicionar testes unitários para garantir a robustez do código.
- Documentação das rotas da API usando Swagger.

## Contribuição

Sinta-se à vontade para contribuir com o projeto, enviando pull requests ou abrindo issues no GitHub.
