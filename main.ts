const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    console.log('New awesome LuizaLabs APIs');
    res.sendStatus(200);
});


//Deve ser possível criar, atualizar, visualizar e remover Clientes

/**
 * post clientes/cadastro/remover
 * post clientes/cadastro/adicionar
 * post clientes/cadastro/atualizar
 * post clientes/wishlist/remover ( passar o id do produto )
 * post clientes/wishlist/adicionar (passar o id do produto)
 * get clientes/:email
 */

app.get('/clientes/:email', async (req, res, next) => {

});

app.use('/clientes/cadastro', require('./routes/cadastro'));
app.use('/clientes/wishlist', require('./routes/wishlist'));

app.listen(8080, () => {
    console.log('Server running in http://127.0.0.1:8080')
});