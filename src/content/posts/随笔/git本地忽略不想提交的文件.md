---
title: git本地忽略不想提交的文件
pubDate: 2024/06/04 09:53:00
updatedDate: 2024/06/04 09:54:00
author: NPMRUN
category: 随笔
tags:
  - 随笔
heroImage: https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合2
hot: false
hidden: false
relatedPosts:
  - 随笔/git本地忽略不想提交的文件
---
两种方式assume-unchanged和skip-worktree

1. 添加本地忽略
    ```bash
    git update-index --assume-unchanged 【文件路径】
    git update-index --skip-worktree 【文件路径】
    ```
2. 移除本地忽略(恢复跟踪)
    ```bash
    git update-index --no-assume-unchanged vue.config.js
    git update-index --no-skip-worktree vue.config.js
    ```
3. 查看所有文件列表
    ```bash
    git ls-files -v
    ```
    小写h开头是assume-unchanged,大写S是skip-worktree。


| 文件标识 |         描述         |
|:--------:|:--------------------:|
|    H     |  缓存，正常跟踪文件   |
|    S     |  skip-worktree文件   |
|    h     | assume-unchanged文件 |
|    M     |   unmerged, 未合并   |
|    R     |   removed/deleted    |
|    C     | modified/changed修改 |
|    K     |     to be killed     |
|    ?     |    other，忽略文件    |

> cmd查询本地忽略
> git ls-files -v |find /V "H "

> linux查询方法
> git ls-files -v | grep '^h\ '

这两个参数区别:

1. assume-unchanged 假定不变
    这个会关闭文件与远程仓库的跟踪，认为这个文件远程仓库是不会修改，所以每次pull都是本地的文件
2. skip-worktree 跳过工作树
    这个不会关闭文件与远程仓库的跟踪，只是告诉Git不要跟踪对本地文件/文件夹的更改

> pull拉取最新的变化,会提示冲突，但因为没有跟踪本地更改，所以需要no-skip-worktree再合并最新的变化

最合适的是skip-worktree，因为它还在跟踪远程库的修改。只是合并修改比较麻烦

> 另：.git/info/exclude：这个会删除远程仓库忽略文件，保留本地文件

## 附录

- https://github.com/Alcyon-Dev/vscode-ext-git-skip
- https://automationpanda.com/2018/09/19/ignoring-files-with-git/
