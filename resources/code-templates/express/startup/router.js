/* eslint-disable func-names */
const express = require('express');
const example = require('../routes/example');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/example', example);
    app.use(error);
};
