const express = require('express');
const path    = require('path');
var app       = express();
var editor    = require('./index');

var config = {
    editables: {
        'pages': {
            path: 'pages',
            prepends: {
                fields: [{
                    'title': 'string',
                    'author': 'string',
                    'description': 'string'
                }],
                tmpl: `{{{
"title"       : "%title%",
"author"      : "%author%",
"description" : "%description%""
}}}`
            },
            appends: null
        },
        'posts': { 
            path: 'posts',
            prepends: {
                fields: [{
                    'title'      : 'string',
                    'author'     : 'string',
                    'description': 'string',
                    'categories' : 'arr_of_string',
                    'tags'       : 'arr_of_string',
                    'date'       : 'date_now:yyy-mm-dd'
                }],
                tmpl: `{{{
"title"      : %title%,
"author"     : %author%,
"categories" : [ %categories% ],
"tags"       : [ %tags% ],
"date"       : %date%
}}}`            
            },
            appends: null
         }
    }
}

app.get('/', function(req, res) {
    res.redirect(301, '/editor');
});

app.use('/editor', editor(config));

// start the server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});