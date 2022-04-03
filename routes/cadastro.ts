import * as express from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { Customer, Product } from '../types';
import * as db from '../database';

const router = express.Router();

router.get('/:email', async (req, res, next) => {
    const email = req.params.email;

    const foundCustomer = await db.findCustomer(email);
    if (!foundCustomer) {
        console.error(`Email "${email} is not in the database."`);

        res.json({
            status: 'error',
            message: 'Cliente não encontrado.'
        });

    } else {
        const wishlist: Product[] = [];

        const productIds = await db.getCustomerProductIds(foundCustomer.email);
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
            message: 'Informações do cliente e sua wishlist foram encontradas.',
            data: {
                email: foundCustomer.email,
                name: foundCustomer.name,
                wishlist: wishlist
            }
        });
    }
});

router.post('/adicionar', async (req, res, next) => {
    const customer: Customer = req.body.customer;

    if (!customer) {
        console.error('Wrong customer data format.');

        res.json({
            status: 'error',
            message: 'Dados do cliente não estão corretos.'
        });
        return;
    }

    const addedCustomer = await db.addCustomer(customer);
    if (!addedCustomer) {
        res.json({
            status: 'error',
            message: 'Cliente não foi adicionado.'
        });
        return;
    }

    res.json({
        status: 'success',
        message: 'Cadastro finalizado com sucesso.',
        data: {
            name: customer.name,
            email: customer.email
        }
    });
});

router.post('/atualizar', async (req, res, next) => {
    let newEmail = '';
    if (!!req.body.update && req.body.update.email) {
        newEmail = req.body.update.email;
    }

    let newName = '';
    if (!!req.body.update && req.body.update.name) {
        newName = req.body.update.name;
    }

    const email = req.body.email;
    const updatedCustomer = await db.updateCustomer(email, newName, newEmail);
    if (!updatedCustomer) {
        res.json({
            status: 'error',
            message: 'Atualização não foi efetuada.'
        });
        return;
    }

    res.json({
        status: 'success',
        message: 'Cliente atualizado com sucesso.'
    });
});

router.post('/remover', async (req, res, next) => {
    const email = req.body.email;

    const customerRemoved = await db.removeCustomer(email);
    if (!customerRemoved) {
        res.json({
            status: 'error',
            message: 'Não foi possível remover o cliente do banco de dados.'
        });
        return;
    }

    res.json({
        status: 'success',
        message: 'Cliente removido com sucesso.'
    });
});

module.exports = router;