import * as express from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { Customer, Product } from '../src/types';
import * as db from '../src/database';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const customers = await db.getCustomers();

    res.json({
        status: 'success',
        message: 'Clientes cadastrados encontrados com sucesso.',
        data: customers
    });
});

module.exports = router;