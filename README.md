# LuizaLabs Desafio Técnico

Esse projeto contém a implementação do desafio técnico do LuizaLabs interagindo com API de produtos dos mesmos.

## Requisitos e Ferramentas

Esse projeto utiliza os seguintes:
- NodeJS
- TypeScript
- MongoDB
- [Mocha](https://mochajs.org/) (js tests framework)

Só é necessário ter o [NodeJS]((https://nodejs.org/en/)) pré instalado para a execução do projeto. Outras dependências são gerenciadas pelo gerenciador de pacotes NPM.

## Execução

Apos instalar o NodeJS,

1. Clone este repositório.

    `git clone https://github.com/jessicamarcomini/luizalabs.git`

2. Na pasta root, onde se encontra o arquivo "package.json", rode o comando abaixo para que o gerenciador de pacotes NPM instale todas as dependências do projeto.

    `npm ci`

3. Na mesma pasta, rode o comando abaixo:

    `npm run server`

    Este comando compila o projeto em typescript, cria uma pasta de output "dist" onde se encontram os arquivos .js transpilados e então executa o arquivo "main.js" inicializando o server em http://localhost:8080/.

    *Obs: é importante manter o endereço e porta como apresentados (localhost:8080) porque na configuração de acesso ao banco de dados, esse endereço é autorizado.*

## Rotas e endpoints

Todos os http requests precisam conter no header as credenciais de Basic Auth a seguir:

- username: u_luizalabs
- password: p_luizalabs


Os seguintes endpoints estão disponíveis:

- GET /clientes
- GET /clientes/cadastro/:email
- POST /clientes/cadastro/adicionar
- POST /clientes/cadastro/atualizar
- POST /clientes/cadastro/remover
- POST /clientes/wishlist/adicionar
- POST /clientes/wishlist/remover

<br>

**GET /clientes**

Retorna todos os cadastros no banco de dados.

<br>

**GET /clientes/cadastro/:email**

Retorna o cadastro e a wishlist (nome + email + wishlist) correspondente ao email.

Parâmetro *email* deve corresponder a um email já cadastrado no banco de dados.

Exemplo:

`GET http://localhost:8080/clientes/cadastro/je.marcom@gmail.com`

<br>

**POST /clientes/cadastro/adicionar**

Adiciona um cliente novo no banco de dados.

*Body*:
```
{
    customer: {
        name: <nome do cliente>,
        email: <email do cliente>
    }
}
```

<br>

**POST /clientes/cadastro/atualizar**

Atualiza um cadastro existente com nome e/ou email.

*Body*:
```
{
    email: <email atual do cliente>,
    update: {
        name: <nome novo>,
        email: <email novo>
    }
}
```

<br>

**POST /clientes/cadastro/remover**

Remove um cadastro existente.

*Body*:
```
{
    email: <email atual do cliente>
}
```

<br>

**POST /clientes/wishlist/adicionar**

Adiciona um produto à wishlist de favoritos de um cliente cadastrado.

*Body*:
```
{
    email: <email do cliente>,
    productId: <id do produto>
}
```

<br>

**POST /clientes/wishlist/remover**

Remove um produto da wishlist de favoritos de um cliente cadastrado.

*Body*:
```
{
    email: <email do cliente>,
    productId: <id do produto>
}
```

## Testes

Para testes manuais e realização dos http requests, é sugerida pela autora a utilização do [Postman](https://www.postman.com/).

Veja abaixo um exemplo do GET request em /clientes/cadastro/:email feito através do Postman com o projeto rodando em localhost:8080.

![image](https://user-images.githubusercontent.com/13108925/161439074-d4671c27-6529-495a-aeeb-17bcbc2f6d05.png)

<br>

Para execução dos testes unitários,

1. Inicialize o server local.

    `npm run server`

2. Rode os testes.

    `npm run test`



## Considerações
Algumas considerações da autora:
- Acabei utilizando uma database do MongoDB Atlas que eles hosteam de graça para propósitos de aprendizagem. Por esse motivo (e por não haver dados sensíveis nesse exercício) a string de acesso a url da minha database está hardcoded no código mesmo com intuito de facilitar o acesso.

- Incluí um usuário "admin" que chamei de "u_luizalabs" para autorizar acesso a todos os endpoints ao invés de buscar o usuário no banco de dados (até menciono na seção abaixo que esse é o meu proximo passo :) ). O password e username na autenticação e autorização também estão hardcoded para facilitar (assumindo aqui que o foco seja o gerenciamento dessas etapas da API e não o valor das credenciais). 


## Próximos Passos

1. Sincronizar autenticação e autorização com o banco de dados checando as credenciais e permissões dos usuários.
2. Remover acesso ao banco de dados da url hardcoded em database.ts e substituir por env vars.

