/*-----------------------------------*\
|机器人实例生成
|入口文件
\*-----------------------------------*/
//引入配置文件
const configBot = require('./config')

//引入sdk
const { Wechaty } = require('wechaty')

//开启机器人回答模板实例 并将实例暴露到全局让所有的文件调用
const {BotResponse}=require('./lib/BotResponse.js')
const botres=new BotResponse()

//引入终端日志
//使用热更新->紧更新on-message.js内的改动>其他的地方还是需要重启项目
//引入终端二维码图片输出
const {
  EventLogger,
  EventHotHandler,
  QRCodeTerminal,
} = require('wechaty-plugin-contrib')

//机器人名字
const name = 'Boti'

//热更新配置
const config = {
  login: './listeners/on-login.js',
  message: './listeners/on-message.js',
}

//生成机器人实例
const bot = new Wechaty({
  name,
})

configBot.bot = bot

//开启热更新
bot.use(EventHotHandler(config))

//开启日志-可以进行配置-没有文档-只能看文档配置-后续可标注
bot.use(EventLogger())

//开启二维码输出
bot.use(QRCodeTerminal({ small: true }))

//机器人启动
bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error('操，启动失败了',e))


module.exports={
  botres
}