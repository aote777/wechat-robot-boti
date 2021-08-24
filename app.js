/*
 * @Description:  实例化 - 入口文件
 */
const { Wechaty } = require('wechaty')
const { EventLogger ,EventHotHandler,QRCodeTerminal } = require('wechaty-plugin-contrib')
const name = 'wechat-puppet-wechat'
const configBot = require('./config')
const config = {
  login: './listeners/on-login.js',
  message: './listeners/on-message.js',
  friendship: './listeners/on-friendship.js'
}





const bot = new Wechaty({
  name,
})

configBot.bot=bot

bot.use(EventHotHandler(config))  
bot.use(EventLogger())
bot.use( QRCodeTerminal({ small: true }))




bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error(e))


