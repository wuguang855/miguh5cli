# 咪咕游戏H5简易构建工具

## 安装 
1. 下载源码到任意文件夹 
2. 在源码所在目录 执行‘npm install ./ -g’ , 全局安装构建工具
3. 安装完成后源码，可以直接删除，无需保留

## 使用

### 创建一个文件夹用于构建项目

### 在上一步所创建的文件夹下创建“miguh5.config.json”的配置文件，格式如下：

```
{
	"appName":"",
	"appDescription":"",
	"appAuthor":"",
	"h5Id":"19",
	"pages":[
		{
			"pageName":"index",
			"pageTitle":"咪咕游戏,页面1",
			"pageId":99
		},
		{
			"pageName":"other",
			"pageTitle":"咪咕游戏,页面2",
			"pageId":100
		}
	]
}

```

其中：
1. appName 为项目名称， 比如 'newyear'
2. appDescription 为项目描述，比如‘新年活动’
3. appAuthor 为作者信息
4. h5Id 为此项目的h5_id
5. pages 为一组页面信息，其中：
1） pageName 为页面的名称。 不包含 .html
2)	pageTitle 为页面的标题， 会显示为 html的 title属性
3）	pageId 页面的 page_id

### 在 文件夹下 执行 'mgh5cli' 完成构建

##	关于 mgh5cli 命令

1）mgh5cli -h 打开帮助信息。    		等价于   mgh5cli --help
2）mgh5cli -V 查看构建工具的版本号 	等价于   mgh5cli --version
3）mgh5cli -c '配置文件位置'  使用指定的配置文件构建项目（配置文件可以在任意位置，我们建议放在项目文件夹）		
等价于   mgh5cli --config

## 关于项目开发中的命令
1. npm run dev    打开开发模式， 等价于  npm run dev:test
2. npm run dev:prod 链接正式环境数据，打开开发模式
3. npm run 	build 构建正式环境代码， 等价于 build:prod
4. npm run 	build:test 构建测试环境代码，
5. npm run 	build:gray 构建灰度环境代码

## 关于项目结构，其他自行了解，主要说src文件夹 ，一般情况下 不需要修改其他文件夹下的文件；
	／src
		／css 公用js 一般不用动，字符文件再其中
		／lib 引入的外部资源，目前只有 vconsole 和 flexible
		／<name> 某个页面的资源文件，与配置文件中的name一致
			/api  与服务端交互的方法
			/css  私有的样式
			/img  私有的图片
			/tpl  模板文件， 默认引入“.tpl” 使用ejs 引擎渲染；如有需要，可以提出添加 
		/<name>.js 某个页面的入口文件，与配置文件中的name一致，资源放在同名的文件夹下























