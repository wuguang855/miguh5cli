
//创建多级文件夹

var fs= require('fs');
var mkDirs = function(dirpath){
	var dirArray = dirpath.split('/');
	var currentDir="";
	for(var i=0;i<dirArray.length;i++){
		var dir = dirArray[i]?dirArray[i]:"";
		currentDir += dir +"/";
		if (!fs.existsSync(currentDir)) {
            fs.mkdirSync(currentDir);
        }
	}
};
module.exports = mkDirs;