# JSON-Server do início ao Deploy

Esse repositório é um exercício de construção do pseudo-backend.
Foi imaginado a demanda de uma empresa de parques de diversões ou fliperama.
Há três rotas possíveis de acesso sendo todas elas exigido autenticação do usuário, com exceção da rota para criação de usuário.

## Endpoints

Para acessar a API use o padrão: 

Corpo da requisição
```json

{
    "key": "content",
    "key": "content"
},

    {
        "headers": { "Authorization": "Bearer ${token}" },
    }
```

O url base da API é https://bk-json-server.herokuapp.com/

### Cadastro

Dois campos são obrigatório: email e password. Não há necessidade de passar o token de acesso.

`GET /users - FORMATO DA RESPOSTA - STATUS 200`
```json
    {
        "email": "murillo@mail.com",
        "password": "123456"
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cmlsbG9AbWFpbC5jb20iLCJpYXQiOjE2NDIxOTU3MTQsImV4cCI6MTY0MjE5OTMxNCwic3ViIjoiMiJ9.MmUgJvZ-EhmSz7gMtfDX1EjrX8fRuK8b4eLpW_YG1hM",
    "user": {
        "email": "murillo@mail.com",
        "id": 2
    }
    }
```


### Login

Dois campos são obrigatório: email e password. É preciso ser dono do recurso.

`POST /signin - FORMATO DA RESPOSTA - STATUS 200`
```json
    {
        "email": "murillo@mail.com",
        "password": "123456"
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11cmlsbG9AbWFpbC5jb20iLCJpYXQiOjE2NDI0Mzc5NzIsImV4cCI6MTY0MjQ0MTU3Miwic3ViIjoiMiJ9.0R6QRliUwBCbFiz3mSfCoR2ak3LFvXXKnanJ07Ovw4A",
    "user": {
        "email": "murillo@mail.com",
        "id": 2
    }
    }
```

### ALTERAR DADOS CADASTRAIS

Caso precise alterar informações do usuário cadastrado, use o cabelhaço de autentição. É preciso ser dono do recurso.

`PATCH /users/:userId - FORMATO DA RESPOSTA - STATUS 200`
```json
    {
        "email": "murillo@hotmail.com",
        "password": "123456"
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
    "email": "murillo@hotmail.com",
    "password": "$2a$10$qb2HOvBzP5HCEKPd60qmJe9SgGcvcrSbrIE0/FJ.Y/rAma//MKmFK",
    "id": 2,
    "userId": 2
    }
```

### EXCLUIR UM USUÁRIO

Use cabeçalho de autenticação. É preciso ser dono do recurso.

`DELETE /users/:userId - FORMATO DA RESPOSTA - STATUS 200`

Caso dê tudo certo, a resposta será assim:
```json
    {}
```

### CRIAR UM JOGO OU BRINQUEDO

No corpo da requisição é preciso passar o id do usuário que está criando. Não se esqueça do cabeçalho de autenticação.

`POST /brinquedos - FORMATO DA RESPOSTA - STATUS 200`

```json
    {
        "name": "montanha russa",
        "cost": 1,
        "userId": 2
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
        "name": "montanha russa",
        "cost": 1,
        "userId": 2,
        "id": 3
    }
```

### VISUALIZAR OS JOGOS CADASTRADOS

Recuperar todos os brinquedos cadastrados. Enviar cabeçalho de autenticação.

`GET /brinquedos - FORMATO DA RESPOSTA - STATUS 200`


Caso dê tudo certo, a resposta será assim:
```json
    [
    {
        "name": "montanha russa",
        "cost": 1,
        "id": 1
    },
    {
        "name": "montanha russa",
        "cost": 1,
        "userId": 2,
        "id": 2
    }
    ]
```

### EDITAR UM JOGO

O endpoint deverá conter o id do jogo que se quer alterar e no corpo da requisição apresentar o userId de quem o criou. Enviar cabeçalho de autenticação.

`PATCH /brinquedos/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
    {
        "name": "montanha russa",
        "cost": 1,
        "userId": 2
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
        "name": "montanha russa",
        "cost": 1,
        "id": 1,
        "userId": 2
    }
```

### APAGAR UM JOGO

Para apagar um recurso, basta informar o id do jogo ao final da endpoint. Qualquer usuário autenticado pode deletar.

`DELETE /brinquedos/:id - FORMATO DA RESPOSTA - STATUS 200`

Caso dê tudo certo, a resposta será assim:
```json
    {}
```

### CRIAR FICHAS

O endpoint /fichas necessita que qualquer uma das operações (CRUD) seja feito pelo criador do recurso. Informe o id do usuário do corpo da requisição e não se esqueça da autenticação.

`POST /fichas - FORMATO DA RESPOSTA - STATUS 200`

```json
    {
        "userId": 1,
        "coins": 100
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
        "userId": 1,
        "coins": 100,
        "id": 2
    }
```

### VISUALIZAR LISTA DAS FICHAS

Todos podem ler o curso, mas devem estar autenticado.

`GET /fichas - FORMATO DA RESPOSTA - STATUS 200`


Caso dê tudo certo, a resposta será assim:
```json
    [
        {
            "userId": 2,
            "coins": 100,
            "id": 1
        },
        {
            "userId": 1,
            "coins": 100,
            "id": 2
        }
    ]
```

### ATUALIZAR AS INFORMAÇÕES DE UM JOGO

Apenas pode ser realizado pelo criador do recurso

`PATCH /fichas/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
    {
        "userId": 1,
        "coins": 100,
        "id": 2
    }
```

Caso dê tudo certo, a resposta será assim:
```json
    {
        "userId": 1,
        "coins": 100,
        "id": 2
    }
```

### EXCLUIR UM RECURSO

É preciso ser dono do recurso. Informe ao final do endpoint o id do recurso que deseja deletar.

`DELETE /fichas/:id - FORMATO DA RESPOSTA - STATUS 200`

Caso dê tudo certo, a resposta será assim:
```json
    {}
```