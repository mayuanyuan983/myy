module.exports = [
	{
		title:'首页',
		path:'/notes/language/java/'
	},
	{
		title:'JAVA基础',
		children: [
			'/notes/language/java/notes/base/1',
			'/notes/language/java/notes/base/2'
		]
	},
	{
		title:'Spring',
		children: [
			{
				title:'Spring',
				path:'/notes/language/java/notes/spring/1'
			},
			{
				title:'FAQ',
				path:'/notes/language/java/notes/spring/faq'
			},
		]
	},
	{
		title:'数据库框架',
		children: [
			'/notes/language/java/notes/mybatis/1',
			'/notes/language/java/notes/mybatis/2',
		]
	},
    {
		title:'工具',
		children: [
			{
				title: 'jasypt',
				path:'/notes/language/java/notes/tools/jasypt'
			},
		]
	},
	{
		title: 'Maven',
		path:'/notes/language/java/notes/maven/0'
	}
]