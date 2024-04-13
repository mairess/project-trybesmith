# <p align="center">Projeto Trybesmith</p>

<div align="center">
  
| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-86.36%25-yellow.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)    |

</div>

## Contexto

Este projeto consiste em uma loja de itens medievais no formato de uma API de `Node.js` com `Express`, utilizando `Typescript` e `Sequelize` seguindo o modelo `MSC`. Sendo possível cadastrar um produto, listar todos produtos, listar usuários com seus respectivos produtos através do relacionamento `1:N` e uma rota de login para obter autenticação com `JWT`. A aplicação também possui uma boa cobertura de testes, com testes de `integração` e testes `unitários`.

<details>

<summary><strong>Rode o projeto localmente</strong></summary><br>

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.
>
<!-- > ⚠️ É preciso criar um arquivo `.env` na raiz do projeto, siga o exemplo do arquivo [`env.example`](./env.example). -->
>

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-trybesmith.git
```

2. Instale as dependências:

```BASH
npm install
```

3. Inicie o container do banco de dados:

```BASH
docker compose up -d db
```

4. Crie o banco, rode as migrations e os seeders:

```BASH
npm run db:reset
```

5. Inicie o servidor:

```BASH
npm run dev
```

6. O servidor estará disponível na porta `3001`

</details>

<details>

<summary><strong>Rode o projeto com o docker</strong></summary><br>

> ⚠️ É preciso ter o [Docker](https://www.docker.com/get-started/) instalado em sua máquina.

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-trybesmith.git
```

2. Suba os containers:

```BASH
docker compose up -d
```

3. Crie o banco, rode as migrations e os seeders:

```BASH
npm run db:reset
```

4. O servidor estará disponível na porta `3001`

</details>


<details>

<summary><strong>Rode os testes</strong></summary><br>

Rode os testes com:

```SHELL
npm run test:local
```

Rode a cobertura:

```SHELL
npm run test:coverage
```

</details>

## Documentação da API

A documentação desta api está disponível na rota `/api-docs`

## Stack utilizadas

- Typescript
- Node
- Express
- Sequelize
- MySQL
- JWT
- Bcrypt
- Mocha
- Chai
- Sinon