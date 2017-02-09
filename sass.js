var sass = require('node-sass');
var path = require('path');
var fs = require('fs');


sass.render({
	file: path.join(__dirname, 'src', 'sass', 'main.scss'),
	outputStyle: 'compressed',
	sourceMap: true,
	includePaths: [
		path.join(__dirname, 'node_modules')
	]
}, function(err, result) {
	if (err) {
		console.log(err);
	}

	const outFile = path.join(__dirname, 'public', 'css', 'main.css');

	fs.writeFile(outFile, result.css.toString('utf-8'), function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
});