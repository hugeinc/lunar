var fs = require('fs'),
	file = fs.readFileSync('./orbit/dist/orbit.js', 'utf8'),
	fileArray = file.split('\n'),
	indexes = [],
	newFile;

fileArray.map(function(x, i) {
	if(x.indexOf('.log({') !== -1) {
		fileArray.splice(i,1);
	}
});

newFile = fileArray.join('\n');

newFile.split('\n').filter(function(x, i) {
	if(x.indexOf('.log({') !== -1) {
		indexes.push(i);
	}
});

console.log(newFile);

