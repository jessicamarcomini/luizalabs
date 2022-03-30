import * as express from 'express';

const router = express.Router();

router.post('/adicionar', async (req, res, next) => {
    const email = req.body.email;
    const productId = req.body.productId;

    console.log('wishlist add');

    res.sendStatus(200);
});

router.post('/remover', async (req, res, next) => {
    const email = req.body.email;
    const productId = req.body.productId;

    console.log('wishlist remover');

    res.sendStatus(200);
});

module.exports = router;