## <-重新设计了可扩展式开发框架-> 极大的降低开发难度


# 保姆级注释，会不会js都没关系，会cv就行

### 主要依赖

- [wechaty](https://github.com/wechaty/wechaty) 个人微信账号的微信机器人 SDK
- [superagent](https://github.com/visionmedia/superagent) 数据请求
- [cheerio](https://github.com/cheeriojs/cheerio) nodejs 版 jQuery，用于抓取页面内容
- [node-schedule](https://github.com/node-schedule/node-schedule) 一个在 nodejs 中设置定时任务的库

### 安装依赖

依赖中需要安装`chromium`，使用 npm 会下载失败或者很慢，国内嘛你懂得

**强烈推荐** 使用`cnpm`安装依赖 网好用 npm 也行 最重要的是那个Chromium浏览器下载 那个失败项目就起不来

```bash
cnpm install  //npm install
```


### 运行

```bash
cnpm start
npm start
npm run start
```

底层 api 基于 [wechaty](https://github.com/wechaty/wechaty)

更多微信消息、群消息、好友、对话等相关 api 可查阅官方文档 [wechaty 官方文档](https://github.com/wechaty/wechaty/blob/master/docs/index.md)
