var fs=require('fs');
//删除所有的文件(将所有文件夹置空)
var emptyDir = function(fileUrl){
    var files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function(file){
        var stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
        }
    });
}
//删除所有的空文件夹
var rmEmptyDir = function(fileUrl){
    var files = fs.readdirSync(fileUrl);
    if(files.length>0){
        var tempFile = 0;
        files.forEach(function(fileName)
        {
            tempFile++;
            rmEmptyDir(fileUrl+'/'+fileName);
        });
        if(tempFile==files.length){//删除母文件夹下的所有字空文件夹后，将母文件夹也删除
            fs.rmdirSync(fileUrl);
        }
    }else{
        fs.rmdirSync(fileUrl);
    }
}
var rmDirs = function(rootFile){
    emptyDir(rootFile);
    rmEmptyDir(rootFile);   
}
module.exports = rmDirs;