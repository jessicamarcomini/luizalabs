import * as express from 'express';

const router = express.Router();

router.post('/adicionar', async (req, res, next) => {

    res.sendStatus(200);
});

router.post('/atualizar', async (req, res, next) => {


    res.sendStatus(200);
});

router.post('/remover', async (req, res, next) => {


    res.sendStatus(200);
});

module.exports = router;