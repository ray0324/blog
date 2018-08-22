---
title: 使用Travis CI 自动部署Github Pages
date: 2018-03-31 23:50:10
tags:
---

## 简介

作为一名程序员，在工作中经常会遇到一些比较棘手的问题，解决问题后记录一下日志，以备下次遇到同样的
问题时提供参考查询。很多人选择在博客园写自己的文章，也有部分程序员喜欢自己搭建独立博客。

搭建一个独立的博客是一件比较cool的事情。很多人选择购买一个云服务器，然后自己开发一套博客程序，或
者使用[WordPress](https://cn.wordpress.org/)或者[Ghost](https://ghost.org/)等开源博客
程序部署。但如果我们的博客仅仅是写写文章做做记录的话。[Github Pages](https://pages.github.com/)
结合[Hexo](https://hexo.io/)构建静态博客是一个很不错的选择，这里记录一下自己搭建Github博客的流程。

## 目标

1. 使用Hexo创建静态博客
2. 用Travis CI 进行自动部署到[Github Pages](https://pages.github.com/)上


## Github 仓库创建

### 一、创建发布仓库

登录自己的[Github](https://github.com/)账号，创建一个与自己用户名一致的仓库。如我的用户名是
ray0324，我创建的仓库则是[ray0324.github.io](https://github.com/ray0324/ray0324.github.io)
在这个仓库，用来存放我们的静态博客(当然也可以创建其他仓库名称，然后创建gh-pages分支，但这里建议
单独创建一个博客发布仓库)。我们最终生成的静态博客文件会存放在这个仓库中。

### 二、创建博客源码仓库

这个仓库则用来存储我们的`hexo`项目以及博客`Markdown`源码，当然 我们可以之创建一个仓库，源码放
在`master`分支上，然后构建的代码存放在`gh-pages`分支上。这里不建议。因为那样很容易搞混。我这里
创建的是[blog](https://github.com/ray0324/blog)仓库。

### 三、写Hexo博客

这里我就不详细介绍Hexo的使用了，有需求参见[Hexo文档](https://hexo.io/docs/)。

```bash
$ mkdir blog
$ cd blog
$ npm init -y
$ npm install
```
### 四、将静态博客源码推送到远端源码仓库

在博客目录`blog`下进行初`git`始化:
```bash
git init
git remote add origin git@github.com:ray0324/blog.git
git commit -m 'init hexo blog'
git push -u origin master
```
这样我们就将本地代码推送到我们的博客仓库了。

## 使用Travis CI进行自动化部署

### 一、注册使用Github账号注册Travis CI账号。

我们直接使用github账号授权登录Travis CI 如图
![login](/assets/images/2018-03-31/1.jpg)

### 二、申请一个Travis专用的Github Token供Travis使用

如图，创建一个专用token 注意权限分配。小白的话除了删除权限 其余的都勾上吧。
![login](/assets/images/2018-03-31/5.jpg)
创建的token值注意先保存在本地用记事本记录下来。这个token只有在创建的时候我们才能看到，
需要保存下，否则下次只能更新才能看到。

### 三、选择我们的源码项目，作为构建目标

这里我选择自己的blog源码仓库 如图
![login](/assets/images/2018-03-31/2.jpg)
单击项目右侧的设置按钮，对仓库进行设置
![login](/assets/images/2018-03-31/3.jpg)
配置如下，这里重点注意需要配置一个全局变量 用来存储Github Token，这里命名`GH_TOKEN`
![login](/assets/images/2018-03-31/4.jpg)

### 四、创建Travis配置文件

下面是我配置的`.travis.yml`文件，这里，可以直接复制粘贴进行使用。具体的含义请自行百度，

```yml
language: node_js
node_js: stable
# S: Build Lifecycle
install:
  - npm install
#before_script:
 # - npm install -g gulp
script:
  - hexo g
after_script:
  - cd ./public
  - git init
  - git config user.name "ray0324"
  - git config user.email "ray0324@foxmail.com"
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master
# E: Build LifeCycle
branches:
  only:
    - master
env:
 global:
   - GH_REF: github.com/ray0324/ray0324.github.io.git
```

我这里大致解释一下流程，这里是告诉Travis

1. 语言为nodejs，版本为`stable`
2. 构建第一步，在仓库中进行`npm install`安装博客的`npm`包
3. 安装完成后执行 `hexo g`命令 生成静态博客
4. 分布执行after_script中的操作最后将生成的代码发布到我们制定的Github博客仓库，这里仓库的地址为`GH_REF`即最后的global变量中的\
5. ` v hb /≥/sAazvfvfv  ][]=[GH_REF`.

 *注：`git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master`中`GH_TOKEN`和`GH_REF`分别为我们已经配置的Github Token以及我们要发布的目标仓库，二者均为全局变量，其中GH_TOKEN我们不能对外公布，所以要配置在Travis的项目管理平台*

配置文件创建完成后我们将代码同步push到blog仓库进行更新

### 五、开写博文

写好博文后同步到github仓库，我们发现Travis已经开始为我们同步代码了。
![](/assets/images/2018-03-31/6.jpg)



