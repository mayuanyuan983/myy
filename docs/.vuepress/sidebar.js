module.exports = {
	//对多模块的管控，利于维护
	//第一个模块下面的侧边栏

	'/index': require('../index/sidebar'),//示例页面

	'/page/install': require('../page/install/sidebar'),

	'/page/nodejs': require('../page/nodejs/sidebar'),
	'/page/vue': require('../page/vue/sidebar'),
	'/page/nginx': require('../page/nginx/sidebar'),
	'/page/linux': require('../page/linux/sidebar'),
	'/page/wechat': require('../page/wechat/sidebar'),
	'/page/project/git': require('../page/project/git/sidebar'),

	'/page/db/redis': require('../page/db/redis/sidebar'),
	'/page/db/mysql': require('../page/db/mysql/sidebar'),
	'/page/db/sql': require('../page/db/sql/sidebar'),
	'/page/db/oracle': require('../page/db/oracle/sidebar'),

	'/page/java/java': require('../page/java/java/sidebar'),
	'/page/java/springboot': require('../page/java/springboot/sidebar'),
	'/page/java/hutool': require('../page/java/hutool/sidebar'),
	'/page/java/designPattern': require('../page/java/designPattern/sidebar'),
	'/page/java/RabbitMQ': require('../page/java/RabbitMQ/sidebar'),
	'/page/java/spring': require('../page/java/spring/sidebar'),
	'/page/java/jdk': require('../page/java/jdk/sidebar'),
	'/page/java/study': require('../page/java/study/sidebar'),

	'/page/package/ant': require('../page/package/ant/sidebar'),
	'/page/package/maven': require('../page/package/maven/sidebar'),
}