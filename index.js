const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const typesRoute = require('./server/types-route');
const itemRoute = require('./server/item-route');

const baseOptions = {};

module.exports = function (config) {
    const options = Object.assign({}, baseOptions, config);
    const router = express.Router();

    router.use(bodyParser.json());

    router.use('/static', express.static(path.join(__dirname,'public')));

    /* Accessing the Index file */
    router.route('/')
        .get((req, res) => {
            res.sendFile(path.join(__dirname,'public','index.html'));
        });


    /* Get types of pages */
    router.route('/api/')
        .get((req, res) => {
            if(config.editables){
                res.json(Object.keys(config.editables));
            }
            else {
                return res.sendStatus(401);
            }
        });


    router.use(typesRoute(config));
    router.use(itemRoute(config));


    return router;
};