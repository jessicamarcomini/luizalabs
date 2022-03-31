const express = require('express');
import axios, { AxiosRequestConfig } from 'axios';
import * as db from './datahandling';
import { Product } from './types';

const app = express();

app.get('/', (req, res, next) => {
    console.log('New awesome LuizaLabs APIs');
    res.sendStatus(200);
});

app.get('/clientes/:email', async (req, res, next) => {
    const email = req.params.email;

    const customer = await db.findCustomer(email);
    if (!customer) {
        console.error(`Email "${email} is not in the database."`);

        res.json({
            status: 'error',
            message: 'Customer was not found in the database.'
        });

    } else {
        const wishlist: Product[] = [];

        const productIds = await db.getCustomerProductIds(customer.email);
        if (productIds.length > 0 ) {
            for (const id of productIds) {
                const options: AxiosRequestConfig = {
                    method: 'GET',
                    url: `http://challenge-api.luizalabs.com/api/product/${id}/`
                }
                const product = await axios.request(options);
                if (!product) {
                    console.error('Product not found!');
                } else {
                    wishlist.push(product.data);
                }
            }
        }

        res.json({
            status: 'success',
            message: 'Customer and wishlist info retrieved!',
            data: {
                email: customer.email,
                name: customer.name,
                wishlist: wishlist
            }
        });
    }
});

app.use('/clientes/cadastro', require('./routes/cadastro'));
app.use('/clientes/wishlist', require('./routes/wishlist'));

app.listen(8080, () => {
    console.log('Server running in http://127.0.0.1:8080')
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