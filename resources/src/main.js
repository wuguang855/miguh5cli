//以下开始构建页面
if(process && process.eve && process.eve.EXE_ENV=="run:dev"){
	require('./lib/vconsole.js');
}
require('./<pageName>/css/main.scss');
require('./css/common.scss');
require('./lib/flexible.js');

const $   =  require('jquery');
const MG  = require('basic');
const api = require('./<pageName>/api');

//初始化经分组件
var H5_id="<h5Id>";
var page_id="<pageId>";
var page_name="<pageName>";

//！！注意：定义pages枚举值～
var pages = [
	{"id":page_id,"name":page_name,"routerName":page_name,"pv":"1"}
];
//！！注意：定义button枚举值～
var buttons = [
	{"id":"1" ,"name":"下载咪咕游戏","type":"1"},
];

window.report = new MG.Report({
	H5_id: H5_id,
	pages:pages,
	buttons:buttons
});

report.visitEvent(page_id,H5_id);

window.onbeforeunload = function() {
	report.unloadEvent(page_id,H5_id);
}

/*开始构建页面，可以使用jq对dom的所有操作，默认引入了ejs模版*/

//举个例子，自行修改
var data = {
	msg:"一个小礼物"
};
var tpl_demo =  require('./<pageName>/tpl/index.tpl');
$("#miguApp").html(tpl_demo(data));