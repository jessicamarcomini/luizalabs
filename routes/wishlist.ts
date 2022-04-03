import * as express from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import * as db from '../database';

const router = express.Router();

router.post('/adicionar', async (req, res, next) => {
    const email = req.body.email;
    const productId = req.body.productId;

    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `http://challenge-api.luizalabs.com/api/product/${productId}/`
        }
        await axios.request(options);
    } catch (error) {
        if (error.response.status == 404) {
            res.json({
                status: 'error',
                message: `Produto com id "${productId}" não existe.`
            });
        }

        console.error(`Error accessing products API: ${error.response.status} - ${error.response.statusText}`);
        return;
    }

    const addedProduct = await db.addProduct(email, productId);
    if (!addedProduct) {
        res.json({
            status: 'error',
            message: 'Não foi possível adicionar o produto à wishlist.'
        });
        return;
    }

    res.json({
        status: 'success',
        message: 'Produto adicionado com sucesso.'
    });
});

router.post('/remover', async (req, res, next) => {
    const email = req.body.email;
    const productId = req.body.productId;

    const removedProduct = await db.removeProduct(email, productId);
    if (!removedProduct) {
        res.json({
            status: 'error',
            message: 'Não foi possível remover o produto.'
        });
        return;
    }

    res.json({
        status: 'success',
        message: 'Produto removido com sucesso.'
    });
});

module.exports = router;