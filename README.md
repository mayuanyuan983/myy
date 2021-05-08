# 说明

yarn global add vuepress # 或者：npm install -g vuepress

npm run dev

username：mayuanyuan
password：123456

快速在每行下面新增空行
word替换：^p替换为^p^p
空行由两个回车组成，即^p^p
^p代表的是段落标记

Fn+r 关闭电源按钮灯

Fn+空格 键盘灯

Win+Shift+S截图

优点:可框选

缺点:无法编辑,快捷键蹩手(对于习惯无名指或小指起手者)

ALT + 鼠标左键 块选（可去除代码左侧行号）



**Crtl + Alt + L**  IDEA代码格式化

```bash
#1.创建新分支（这个命名是基于当前所在分支新建一个赤裸裸的分支，没有任何的提交历史，但是当前分支的内容一应俱全。新建的分支，严格意义上说，还不是一个分支，因为HEAD指向的引用中没有commit值，只有在进行一次提交后，它才算得上真正的分支。）
git checkout --orphan latest_branch
#2.添加所有文件
git add .
#3.commit代码
git commit -m "init"
#4.删除原来的分支
git branch -D master
#5.把当前分支重命名为master
git branch -m master
#6.最后把代码推送到远程仓库（有些仓库有master分支保护，不允许强制push，需要在远程仓库项目里暂时把项目保护关掉才能推送）
git push -f git@github.com:mayuanyuan983/myy.git master


#1.创建新分支（这个命名是基于当前所在分支新建一个赤裸裸的分支，没有任何的提交历史，但是当前分支的内容一应俱全。新建的分支，严格意义上说，还不是一个分支，因为HEAD指向的引用中没有commit值，只有在进行一次提交后，它才算得上真正的分支。）
git checkout --orphan latest_branch
#2.添加所有文件
git add .
#3.commit代码
git commit -m "init-pages"
#4.删除原来的分支
git branch -D gh-pages
#5.把当前分支重命名为gh-pages
git branch -m gh-pages
#6.最后把代码推送到远程仓库
git push -f git@github.com:mayuanyuan983/myy.git gh-pages
```

