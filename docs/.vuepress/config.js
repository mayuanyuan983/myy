module.exports = {
    title: '个人文档',
    description: '早安，打工人',//描述
    dest: './dist',//build目录 默认在.vuepress目录下
    port: '7777',//访问端口
    host: '0.0.0.0',
    lang: 'zh-CN', 
    head: [
        ['link', {rel: 'icon', href: '/img/xing.favicon'}],
		['link', {rel: 'styleSheet', href: '/css/style.css'}],
		['script', {charset: 'utf-8', src: '/js/main.js'}],
    ],
    markdown: {
        lineNumbers: true//代码块行号
    },
    themeConfig: {
        nav: require("./nav.js"),//./指当前目录
        sidebar: require("./sidebar.js"),
        sidebarDepth: 2,
        lastUpdated: '最后更新时间',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        // 其它配置
        repo: 'https://github.com/mayuanyuan983/myy/',
        docsBranch: 'master',
        docsDir: 'docs',
        repoLabel: 'Github',
        editLinks: true,
        editLinkText: '在Github上编辑此页',
    }
}