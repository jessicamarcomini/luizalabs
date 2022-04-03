const express = require('express');

const app = express();

app.use(express.json());

app.use(async (req, res, next) => {
	const autho = req.headers.authorization;

    if (!autho) {
        res.status(401).send('No username or password provided.');
        return;
    }

    const userPass = autho.split(' ')[1];
    const authBuffer = Buffer.from(userPass, 'base64').toString().split(':');
    const username = authBuffer[0];
    const password = authBuffer[1];

    if (username == 'u_luizalabs' && password == 'p_luizalabs') {
        next();
    } else {
        res.status(401).send('Wrong username or password.');
        return;
    }
});

app.get('/', (req, res, next) => {
    console.log('Welcome to the LuizaLabs API. See the documentation for more details.');
    console.log('https://github.com/jessicamarcomini/luizalabs/blob/main/README.md');

    res.sendStatus(200);
});

app.use('/clientes', require('../routes/clientes'));

app.use('/clientes/cadastro', require('../routes/cadastro'));

app.use('/clientes/wishlist', require('../routes/wishlist'));

app.listen(8080, () => {
    console.log('Server running in http://127.0.0.1:8080')
});
