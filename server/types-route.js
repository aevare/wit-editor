const express = require('express');
const path = require('path');
const fs = require('fs');


module.exports = (config) => {

    const router = express.Router();

    /* Get list of items in type */
    router.route('/api/:type')
        .get((req, res) => {
            const type = req.params.type;
            const filesFound =  [];

            const typeConf = config.editables[type];

            if(typeConf && typeConf.path){
                fs.readdir(typeConf.path, (err, files) => {

                    if(err){
                        return res.json([]);
                    }
                    //TODO.. filter on extensions
                    files.forEach(file => {
                        filesFound.push(file);
                    });

                    res.json(filesFound);
                });
            }
            else {
                return res.sendStatus(403);
            }
        });

    return router;
}