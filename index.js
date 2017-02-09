const express = require('express');
const path = require('path');
const fs = require('fs');
const fm  = require('json-front-matter');

const baseOptions = {};

module.exports = function (config) {
	const options = Object.assign({}, baseOptions, config);
	const router = express.Router();

  	router.route('/')
  		.get((req, res) => {
			res.sendFile(path.join(__dirname,'html','index.html'));
		});

	router.route('/:type')
  		.get((req, res) => {
			const type = req.params.type;
			const filesFound =  [];

			if(config.editables[type] && config.editables[type].path){
				fs.readdir(path.join(__dirname,type), (err, files) => {
					if(err){
						return res.json([]);
					}

				  	files.forEach(file => {
				    	filesFound.push(file);
				  	});

				  	res.json(filesFound);
				});
			}
			else {
				return res.sendStatus(401);
			}
		});

	router.route('/:type/:slug')
  		.get((req, res) => {
			const type = req.params.type;
			const slug = req.params.slug;

			if(config.editables[type] && config.editables[type].path){
				fs.readFile(path.join(__dirname, type, `${slug}.md`), (err, data) => {
					if(err){
						return res.sendStatus(404);
					}
					const dataString = data.toString('utf8');
				  	res.json(Object.assign({ slug: slug }, getData(dataString)));
				});
			}
			else {
				return res.sendStatus(401);
			}
		});

	router.use('/static', express.static(path.join(__dirname,'html')));

  	return router;
};

const getData = (data) => {
	const page = { attr: {} };

    var contents  = fm.parse(data);

    page.markdown = contents.body;
    
    // parse out the front-matter
    for (var attr in contents.attributes) {
      page.attr[attr] = contents.attributes[attr];
    }

	return page
}