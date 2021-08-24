/*
 * @Description:  处理用户消息
 */
const path = require('path')
const { FileBox } = require('file-box')
const superagent = require('../superagent')
const config = require('../config')
const { colorRGBtoHex, colorHex } = require('../utils')

const allKeywords = `allKeywords`
/**
 * sleep
 * @param {*} ms
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
/**
 * 处理消息
 */
async function onMessage(msg, bot) {
  //防止自己和自己对话  调试阶段=>解除跟自己对话
  if (msg.self()) return
  const room = msg.room() // 是否是群消息
  if (room) {
    //处理群消息
    await onWebRoomMessage(msg, bot)
  }
  //  else {
  //   //处理用户消息  用户消息暂时只处理文本消息。后续考虑其他
  //   console.log("bot.Message", bot.Message);
  //   const isText = msg.type() === bot.Message.Type.Text;
  //   if (isText) {
  //     await onPeopleMessage(msg, bot);
  //   }
  // }
}
/**
 * 处理用户消息
 */
async function onPeopleMessage(msg, bot) {
  //获取发消息人
  const contact = msg.talker()
  //对config配置文件中 ignore的用户消息不必处理
  if (config.IGNORE.includes(contact.payload.name)) return
  let content = msg.text().trim() // 消息内容 使用trim()去除前后空格
}
/**
 * 处理群消息
 */
async function onWebRoomMessage(msg, bot) {
  // 判断群聊
  const isText = msg.type() === bot.Message.Type.Text

  let idArr = config.ROOMIDARR
  let allowBool = false
  for (let i = 0; i < idArr.length; i++) {
    if (msg.payload.roomId == idArr[i]) {
      allowBool = true
    }
  }
  if (isText && allowBool) {
    const content = msg.text().trim() // 消息内容
    if (content == '毒鸡汤') {
      let poison = await superagent.getSoup()
      await delay(200)
      await msg.say(poison)
    } else if (content == '机器人命令') {
      await delay(200)
      await msg.say(`
      命令提示-全字匹配
      群消息过滤
      舔狗（一天100次调用）
      `)
    } else if (content === '群消息过滤') {
      await delay(200)
      await msg.say(`-本消息只会在已绑定的群发送-`)
    } else if (content === '舔狗') {
      let res = await superagent.getTianDog()
      await delay(200)
      await msg.say(res)
    }
  }
}

module.exports = onMessage
