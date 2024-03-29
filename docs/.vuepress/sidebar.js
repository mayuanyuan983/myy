module.exports = {
	//对多模块的管控，利于维护
	//第一个模块下面的侧边栏
	'/page/install/': require('../page/install/sidebar'),
	'/page/nodejs/': require('../page/nodejs/sidebar'),
	'/page/vue/': require('../page/vue/sidebar'),
	'/page/nginx/': require('../page/nginx/sidebar'),
	'/page/linux/': require('../page/linux/sidebar'),
	'/page/wechat/': require('../page/wechat/sidebar'),
	'/page/project/git/': require('../page/project/git/sidebar'),
	'/page/web-front/': require('../page/web-front/sidebar'),
	'/page/db/redis/': require('../page/db/redis/sidebar'),
	'/page/db/mysql/': require('../page/db/mysql/sidebar'),
	'/page/db/sql/': require('../page/db/sql/sidebar'),
	'/page/db/oracle/': require('../page/db/oracle/sidebar'),
	'/page/db/h2/': require('../page/db/h2/sidebar'),
	'/page/java/java/': require('../page/java/java/sidebar'),
	'/page/java/springboot/': require('../page/java/springboot/sidebar'),
	'/page/java/hutool/': require('../page/java/hutool/sidebar'),
	'/page/java/designPattern/': require('../page/java/designPattern/sidebar'),
	'/page/java/RabbitMQ/': require('../page/java/RabbitMQ/sidebar'),
	'/page/java/spring/': require('../page/java/spring/sidebar'),
	'/page/java/jdk/': require('../page/java/jdk/sidebar'),
	'/page/java/study/': require('../page/java/study/sidebar'),
	'/page/java/offer/': require('../page/java/offer/sidebar'),
	'/page/package/ant/': require('../page/package/ant/sidebar'),
	'/page/package/maven/': require('../page/package/maven/sidebar'),



	'/notes/db/db2/': require('../notes/db/db2/sidebar'),
	'/notes/db/dm/': require('../notes/db/dm/sidebar'),
	'/notes/db/h2/': require('../notes/db/h2/sidebar'),
	'/notes/db/mysql/': require('../notes/db/mysql/sidebar'),
	'/notes/db/oracle/': require('../notes/db/oracle/sidebar'),
	'/notes/db/redis/': require('../notes/db/redis/sidebar'),
	'/notes/db/sqlite/': require('../notes/db/sqlite/sidebar'),

	'/notes/ide/': require('../notes/ide/sidebar'),


	'/notes/language/java/': require('../notes/language/java/sidebar'),
	'/notes/language/javascript/': require('../notes/language/javascript/sidebar'),
	'/notes/language/python/': require('../notes/language/python/sidebar'),

	'/notes/operation/linux/': require('../notes/operation/linux/sidebar'),
	'/notes/operation/windows/': require('../notes/operation/windows/sidebar'),
	'/notes/operation/tools/': require('../notes/operation/tools/sidebar'),

	'/notes/version/': require('../notes/version/sidebar'),

	'/notes/db/': require('../notes/db/sidebar'),
	'/notes/operation/': require('../notes/operation/sidebar'),


	//要放在最后，不然会其他目录无法加载
	'/notes': [
		{
			title:'笔记',
			path:'/notes/'
		},
		{
			title:'装机必备',
			path:'/page/install/'
		}
	]
}