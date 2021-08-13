// eslint-disable-next-line no-unused-vars,func-names
module.exports = function(err, req, res, next) {
    logger.error(`${trace()} [error middleware cache err:%o]`, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.');
};
