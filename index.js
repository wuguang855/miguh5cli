const fs= require('fs');
const path = require('path');

const jsFormat = require('./src/jsFormat.js');
const htmlFormat = require('./src/htmlFormat.js');
const mkDirs = require('./src/mkDirs.js');
const copyDirs = require('./src/copyDirs.js');
const rmDirs = require('./src/rmDirs.js');
//执行所在目录
const cwd = process.cwd()
//此文件所在目录
const dirname = __dirname;

var resource = function (name) {
	return path.resolve(__dirname,'./resources/'+name)
}

var cwdPath = function(relaPath){
	return path.resolve(cwd,relaPath);
}

function createPackage(_config){
	var  contentText = fs.readFileSync(resource("package.json"),'utf-8');
	contentText = contentText.replace("<appName>",_config.appName);
	contentText = contentText.replace("<appDescription>",_config.appDescription);
	contentText = contentText.replace("<appAuthor>",_config.appAuthor);
	contentText = jsFormat(contentText);
	fs.writeFileSync(cwdPath("./package.json"),contentText,{flag: 'w', encoding: 'utf8'});
}

function createWebpackConfig (_config){
	var  contentText = fs.readFileSync(resource("webpack.config.js"),'utf-8');
	var entryStr = "" ;
	var htmlPluginStr = "";
	var pages = _config.pages || [{ "pageName":"index","pageTitle":"咪咕游戏"}];
	for(var i in pages){
		var page = pages[i];
		entryStr += page.pageName + ': resolve(\'./src/'+ page.pageName +'.js\'),'
		htmlPluginStr +=`\r\n
							new HtmlWebpackPlugin({
      							filename: resolve('./dist/${page.pageName}.html'),
					          	template: './index.html',
					          	inject: true,
						        data:{
						            evn:evn,
						            hash:hash,
						            title:"${page.pageTitle}"
						        }
						      }),`
	};
	entryStr = entryStr.substring(0,entryStr.length-1);
	htmlPluginStr = htmlPluginStr.substring(0,htmlPluginStr.length-1);
	contentText = contentText.replace('<entry>',entryStr);
	contentText = contentText.replace('<HtmlWebpackPlugin>',htmlPluginStr);
	contentText = jsFormat(contentText);
	fs.writeFileSync(cwdPath("./webpack.config.js"),contentText,{flag: 'w', encoding: 'utf8'});
}

function createIndexHtml(_config){
	var  contentText = fs.readFileSync(resource("index.html"),'utf-8');
	//contentText = htmlFormat(contentText);
	fs.writeFileSync(cwdPath("./index.html"),contentText,{flag: 'w', encoding: 'utf8'});
}

function createBuild(_config){
	mkDirs('./build');
	var  contentText = fs.readFileSync(resource("build/build.js"),'utf-8');
	contentText = jsFormat(contentText);
	fs.writeFileSync(cwdPath("./build/build.js"),contentText,{flag: 'w', encoding: 'utf8'});
}

function createService(_config){
	mkDirs('./service');
	var  contentText = fs.readFileSync(resource("service/client.js"),'utf-8');
	contentText = jsFormat(contentText);
	fs.writeFileSync(cwdPath("./service/client.js"),contentText,{flag: 'w', encoding: 'utf8'});	
	contentText = fs.readFileSync(resource("service/development.js"),'utf-8');
	contentText = jsFormat(contentText);
	fs.writeFileSync(cwdPath("./service/development.js"),contentText,{flag: 'w', encoding: 'utf8'});	
}

function createPublic(_config){
	mkDirs(cwdPath('./src/css'));
	copyDirs(resource("src/css"),cwdPath("./src/css"));
	mkDirs('./src/lib');
	copyDirs(resource("src/lib"),cwdPath("./src/lib"));
}

function createEnters(_config){
	var pages = _config.pages || [{ "pageName":"index","title":"咪咕游戏","page_id":-1}];
	var h5Id = _config.h5Id;
	for(var i in pages){
		page = pages[i];
		mkDirs(cwdPath('./src/'+page.pageName));
		copyDirs(resource("src/main"),cwdPath("./src/"+page.pageName));
		var  contentText = fs.readFileSync(resource("src/main.js"),'utf-8');
		contentText = contentText.replace("<h5Id>",h5Id);
		contentText = contentText.replace("<pageId>",page.pageId);
		contentText = contentText.replace(/\<pageName\>/g,page.pageName);
		contentText = jsFormat(contentText);
		fs.writeFileSync(cwdPath("./src/"+page.pageName+".js"),contentText,{flag: 'w', encoding: 'utf8'});
	}	
}

function miguh5cli(_config){
	try{
		rmDirs(cwdPath("./src"));
	}catch(e){

	}
	if(typeof(_config)=="string"){
		_config = JSON.parse(_config);
	}
	//创建package.json 文件
	createPackage(_config);
	//创建webpack.config.js 文件
	createWebpackConfig(_config);
	//copy index.html  文件
	createIndexHtml(_config);
	//创建build.js
	createBuild(_config);
	//创建service 
	createService(_config);
	//创建公用sass文件，lib文件
	createPublic(_config);
	//创建入口文件
	createEnters(_config);
	console.log("== 创建成功 ==");
	console.log("配置文件信息==>>\n",_config);
}
module.exports = miguh5cli;