const express = require('express');
const path    = require('path');
const app     = express();
const editor  = require('./index');

var config = {
    editables: {
        'pages': {
            path: path.join(__dirname, 'pages'),
            prepends: {
                fields: {
                    'title': 'string',
                    'author': 'string',
                    'description': 'string'
                },
                tmpl: `{{{
"title"       : "{title}",
"author"      : "{author}",
"description" : "{description}"
}}}`
            }
        },
        'posts': { 
            path: path.join(__dirname, 'posts'),
            prepends: {
                fields: {
                    'title'      : 'string',
                    'author'     : 'string',
                    'description': 'string',
                    'categories' : 'arr_of_string',
                    'tags'       : 'arr_of_string',
                    'date'       : 'date_now:yyy-mm-dd'
                },
                tmpl: `{{{
"title"      : "{title}",
"author"     : "{author}",
"categories" : [ {categories} ],
"tags"       : [ {tags} ],
"date"       : "{date}"
}}}`            
            }
         }
    }
}

app.get('/', function(req, res) {
    res.redirect(301, '/editor/');
});

app.use('/editor', editor(config));

// start the server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});