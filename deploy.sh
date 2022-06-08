# 确保脚本抛出遇到的错误
set -e

git pull origin master
#git pull -f git@github.com:mayuanyuan983/myy.git master

# 生成静态文件
vuepress build docs

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
echo 'github.myy221.top' > CNAME

git init
git checkout --orphan gh-pages
git add -A
git commit -m '自动化部署脚本提交dist'

# 如果你想要部署到 https://USERNAME.github.io
# git push -f git@github.com:mayuanyuan983/myy.git master
git push -f git@github.com:mayuanyuan983/myy.git gh-pages
# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd ../
git add -A
git commit -m '自动化部署脚本提交'
git push -f git@github.com:mayuanyuan983/myy.git master
# cd –
