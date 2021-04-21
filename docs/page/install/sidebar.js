module.exports = [
	{
		title:'首页',
		path:'/page/install/'
	},
	{
		title:'环境变量配置',
		path:'/page/install/notes/1'
	},
	{
		title:'代码规范',
		path:'/page/install/notes/0'
	  },
	{
		title:'软件安装教程',
		collapsable: true,
		children:[
			'/page/install/notes/2',
			'/page/install/notes/3',
			'/page/install/notes/13',
			'/page/install/notes/14',
			'/page/install/notes/16',
		]
	},
	{
		title:'VSCODE',
		collapsable: true,
		children:[
			'/page/install/notes/4',
			'/page/install/notes/5',
		]
	},
	{
		title:'IDEA',
		collapsable: true,
		children:[
			'/page/install/notes/6',
			'/page/install/notes/7',
			'/page/install/notes/8',
			'/page/install/notes/9',
		]
	},
	{
		title:'Linux',
		collapsable: true,
		children:[
			'/page/install/notes/10',
			'/page/install/notes/11',
			'/page/install/notes/12',
		]
	},
	{
		title:'Vuepress',
		collapsable: true,
		children:[
			'/page/install/notes/vuepress/1',
			'/page/install/notes/vuepress/2',
			'/page/install/notes/vuepress/3',
			'/page/install/notes/vuepress/4',
		]
	},
	{
		title:'终端',
		collapsable: true,
		children:[
			'/page/install/notes/17',
			'/page/install/notes/18',
			'/page/install/notes/19',
		]
	},
	{
		title:'FAQ',
		path:'/page/install/notes/15'
	},
]