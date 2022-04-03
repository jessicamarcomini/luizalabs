# LuizaLabs Desafio Técnico

Esse projeto contém a implementação do desafio técnico da LuizaLabs no qual interage com API de produtos dos mesmos.


## Requisitos e Ferramentas
Esse projeto utiliza os seguintes:
- NodeJS
- TypeScript
- MongoDB

So é necessario ter o [NodeJS]((https://nodejs.org/en/)) pré instalado para a execuçao do projeto. Outras dependencias sao gerenciadas pelo gerenciador de pacotes NPM.

## Execuçao

Apos instalar o NodeJS,

1. Clone este repositorio.
`git clone https://github.com/jessicamarcomini/luizalabs.git`

2. Na pasta root, onde se encontra o arquivo "package.json", rode o comando abaixo para que o gerenciador de pacotes NPM instale todas as dependencias do projeto.
`npm ci`

3. Na mesma pasta, rode o comando abaixo:
`npm run server`
Este comando compila o projeto em typescript, cria uma pasta de output "dist" onde se encontram os arquivos .js transpilados e entao executa o arquivo "main.js" inicializando o server em http://localhost:8080/.

## Rotas e endpoints
Todos os http requests precisam conter no header as credenciais de Basic Auth a seguir:
- username: u_luizalabs
- password: p_luizalabs

Os seguintes endpoints estao disponiveis:

- GET /clientes
Retorna todos os cadastros no banco de dados.

- GET /clientes/cadastro/:email
Parametro: *email* deve corresponder a um email ja cadastrado no banco de dados.

Retorna o cadastro (nome + email) correspondente ao email.

Exemplo:
`GET http://localhost:8080/clientes/cadastro/je.marcom@gmail.com`

- POST /clientes/cadastro/adicionar
Adiciona um cliente novo no banco de dados.

Body:
`
{
    customer: {
        name: <nome do Cliente>,
        email: <email do Cliente>
    }
}
`


- POST /clientes/cadastro/atualizar
Atualiza um cadastro existente com nome e/ou email.

Body:
`
{
    email: <email atual do Cliente>,
    update: {
        name: <nome novo>,
        email: <email novo>
    }
}
`

- POST /clientes/cadastro/remover
Remove um cadastro existente.

Body:
`
{
    email: <email atual do Cliente>
}
`

- POST /clientes/wishlist/adicionar
Adiciona um produto à wishlist de favoritos de um cliente cadastrado.

Body:
`{
    email: <email do cliente>,
    productId: <id do produto>
}`

- POST /clientes/wishlist/remover
Remove um produto da wishlist de favoritos de um cliente cadastrado.

Body:
`{
    email: <email do cliente>,
    productId: <id do produto>
}`


## Testes


## Proximos Passos

