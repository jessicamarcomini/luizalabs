const express = require('express');
import axios, { AxiosRequestConfig } from 'axios';
import * as db from './database';
import { Product } from './types';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    console.log('LuizaLabs API');

    res.sendStatus(200);
});

app.use('/clientes/cadastro', require('./routes/cadastro'));

app.use('/clientes/wishlist', require('./routes/wishlist'));

app.listen(8080, () => {
    console.log('Server running in http://127.0.0.1:8080')
});

