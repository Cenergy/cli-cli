const express = require('express');

const router = express.Router();

async function doSomeThing(params) {
    logger.debug(`${trace()} [doSomeThing...:%j]`, params);
    return true;
}

router.get('/', async (req, res) => {
    logger.info(`${trace()} [example(get):%j]`, {});
    try {
        const result = await doSomeThing();
        if (!result) {
            return res.status(400).send('operation failed.');
        }
        return res.status(200).send(result);
    } catch (err) {
        logger.error(`${trace()} [cache err:%o]`, err);
        return res.status(400).send(err.message);
    }
});

router.get('/:id', async (req, res) => {
    logger.info(`${trace()} [example(get):%j]`, req.params);
    try {
        const result = await doSomeThing(req.params);
        if (!result) {
            return res.status(400).send('operation failed.');
        }
        return res.status(200).send(result);
    } catch (err) {
        logger.error(`${trace()} [cache err:%o]`, err);
        return res.status(400).send(err.message);
    }
});

router.post('/', async (req, res) => {
    logger.info(`${trace()} [example(post): body:%j]`, req.body);

    try {
        const result = await doSomeThing(req.body);
        if (!result) {
            return res.status(400).send('operation failed.');
        }
        return res.status(200).send(req.body);
    } catch (err) {
        logger.error(`${trace()} [err:%o]`, err);
        return res.status(400).send(err.message);
    }
});

router.put('/', async (req, res) => {
    logger.info(`${trace()} [example(post): body:%j]`, req.body);

    try {
        const result = await doSomeThing(req.body);
        if (!result) {
            return res.status(400).send('operation failed.');
        }
        return res.status(200).send(req.body);
    } catch (err) {
        logger.error(`${trace()} [err:%o]`, err);
        return res.status(400).send(err.message);
    }
});

router.delete('/', async (req, res) => {
    logger.info(`${trace()} [example(delete): body:%j]`, req.body);
    try {
        const result = await doSomeThing(req.body);
        if (!result) {
            return res.status(400).send('operation failed.');
        }
        return res.status(200).send();
    } catch (err) {
        logger.error(`${trace()} [err:%o]`, err);
        return res.status(400).send(err.message);
    }
});

module.exports = router;
