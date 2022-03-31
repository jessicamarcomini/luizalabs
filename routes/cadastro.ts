import * as express from 'express';
import { Customer } from '../types';
import * as db from '../datahandling';

const router = express.Router();

router.post('/adicionar', async (req, res, next) => {
    const customer: Customer = req.body.customer;

    if (!customer) {
        console.error('Wrong customer data format.');

        res.json({
            status: 'error',
            message: 'Dados do cliente não estão corretos.'
        });
    }

    const addedCustomer = await db.addCustomer(customer);
    if (!addedCustomer) {
        res.json({
            status: 'error',
            message: 'Cliente não foi adicionado.'
        });
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
    }

    res.json({
        status: 'success',
        message: 'Cliente removido com sucesso.'
    });
});

module.exports = router;