
//创建多级文件夹
var path = require('path');
var fs= require('fs');
var mkDirs = function(dirpath){
	var sep = path.sep;
	var dirArray = dirpath.split(sep);
	var currentDir="";
	for(var i=0;i<dirArray.length;i++){
		var dir = dirArray[i]?dirArray[i]:"";
		currentDir += dir +sep;
		if (!fs.existsSync(currentDir)) {
            fs.mkdirSync(currentDir);
        }
	}
};
module.exports = mkDirs;