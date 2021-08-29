/*-----------------------------------*\
|处理接收到的所有消息,转发给所有的
\*-----------------------------------*/

const path = require('path')
const { Wechaty } = require('wechaty')
const { FileBox } = require('file-box')
const config = require('../config')
const { msghandle } = require('../lib/botfuntionModules')
let bot = config.bot

const { botres } = require('../app')

/**
 * sleep延时防止早泄
 * @param {*} ms
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
/**
 * 处理消息
 */
async function onMessage(msg) {
  //防止机器人自己和自己对话-死循环!important
  if (msg.self()) return


  const room = msg.room() // 是否是群消息
  if (room) {
    //处理群消息

    const isText = msg.type() === bot.Message.Type.Text

    let idArr = config.ROOMIDARR
    let allowBool = false
    for (let i = 0; i < idArr.length; i++) {
      if (msg.payload.roomId == idArr[i]) {
        allowBool = true
      }
    }
    if (!Boolean(allowBool && isText)) return
    console.log('\x1B[31m%s\x1B[0m', '这里是新架构测试入口---------')
    try {
      let content = msg.text().trim()
      let result = await msghandle.handle(content)

      console.log('\x1B[31m%s\x1B[0m', '机器人回答', result)
      if (!result) return
      if (typeof result == 'string') {
        await delay(150)
        await msg.say(result)
      } else if (typeof result == 'number') {
        msg.say(result)
      } else if (result instanceof Wechaty.Contact) {
        msg.say(result)
      } else if (result instanceof Wechaty.FileBox) {
        msg.say(result)
      } else if (result instanceof Wechaty.UrlLink) {
        msg.say(result)
      } else if (result instanceof Wechaty.MiniProgram) {
        msg.say(result)
      }
    } catch (error) {
      console.log('\x1B[31m%s\x1B[0m', 'error', error)
    }
  }
}

console.log('onMessage热更新完毕')
module.exports = onMessage
