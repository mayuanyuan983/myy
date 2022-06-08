# MAVEN

mvn install  打包



安装jar包到仓库

mvn install:install-file -DgroupId=com.ksource -DartifactId=score-utils -Dversion=1.0 -Dpackaging=jar -Dfile=score-utils.jar