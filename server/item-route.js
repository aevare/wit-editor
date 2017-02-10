const express = require('express');
const path = require('path');
const fs = require('fs');

const workers = require('./workers');

const getDataString = workers.getDataString;
const getStringFromData = workers.getStringFromData;


module.exports = (config) => {

    const router = express.Router();

    console.log(__dirname);

    /* Work with item */
    router.route('/api/:type/:slug')
        .get((req, res) => {
            const type = req.params.type;
            const slug = req.params.slug;

            const typeConf = config.editables[type];

            if(typeConf && typeConf.path){
                fs.readFile(path.join(typeConf.path, slug), (err, data) => {
                    if(err){
                        return res.sendStatus(404);
                    }
                    const dataString = data.toString('utf8');
                    res.json(Object.assign({ slug: slug }, getDataString(dataString)));
                });
            }
            else {
                return res.sendStatus(403);
            }
        })
        .put((req, res) => {
            const type = req.params.type;
            const slug = req.params.slug;

            const tConfig = config.editables[type];

            if(tConfig && tConfig.path){
                
                const filePath = path.join(tConfig.path, slug);
                const dataString = getStringFromData(req.body, tConfig);

                console.log(dataString);

                fs.writeFile(filePath, dataString, { encoding: 'utf8' }, (err) => {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(403);
                    }

                    res.sendStatus(202);
                });

            }
            else {
                return res.sendStatus(401);
            }

        });

    return router;
};
